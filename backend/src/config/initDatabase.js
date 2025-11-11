import mysql from "mysql2";
import config from "./config.js";

async function initializeDatabase() {
  let initialConnection;
  let dbConnection;

  try {
    console.log("🔄 Inicializando banco de dados...");

    // Primeiro, tentar conectar sem senha (caso o MySQL não tenha senha)
    initialConnection = mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
    });

    // Testar conexão inicial
    await new Promise((resolve, reject) => {
      initialConnection.connect((err) => {
        if (err) {
          console.log("❌ Erro na conexão inicial:", err.message);
          reject(err);
        } else {
          console.log("✅ Conectado ao MySQL!");
          resolve();
        }
      });
    });

    // Criar banco de dados se não existir
    await new Promise((resolve, reject) => {
      initialConnection.query(
        "CREATE DATABASE IF NOT EXISTS eco_tasks",
        (err) => {
          if (err) reject(err);
          else {
            console.log("✅ Banco de dados eco_tasks criado/verificado");
            resolve();
          }
        }
      );
    });

    // Fechar conexão inicial
    initialConnection.end();

    // Agora conectar ao banco específico
    dbConnection = mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: "eco_tasks",
      multipleStatements: true,
    });

    // Conectar ao banco específico
    await new Promise((resolve, reject) => {
      dbConnection.connect((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Criar tabela de tarefas
    await new Promise((resolve, reject) => {
      dbConnection.query(
        `
        CREATE TABLE IF NOT EXISTS tarefas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          titulo VARCHAR(100) NOT NULL,
          categoria VARCHAR(50) NOT NULL,
          status BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `,
        (err) => {
          if (err) reject(err);
          else {
            console.log("✅ Tabela tarefas criada/verificada");
            resolve();
          }
        }
      );
    });

    // Verificar se existem dados
    const [rows] = await new Promise((resolve, reject) => {
      dbConnection.query(
        "SELECT COUNT(*) as count FROM tarefas",
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });

    if (rows[0].count === 0) {
      // Inserir dados de exemplo
      await new Promise((resolve, reject) => {
        dbConnection.query(
          `
          INSERT INTO tarefas (titulo, categoria, status) VALUES 
          ('Separar lixo reciclável', 'reciclagem', false),
          ('Tomar banho rápido para economizar água', 'agua', true),
          ('Desligar as luzes ao sair do ambiente', 'energia', false),
          ('Ir de bicicleta para o trabalho', 'transporte', false),
          ('Comprar produtos locais e da estação', 'alimentacao', true),
          ('Evitar uso de plásticos descartáveis', 'consumo', false),
          ('Plantar uma árvore no jardim', 'natureza', false),
          ('Ler um livro sobre sustentabilidade', 'educacao', true)
        `,
          (err) => {
            if (err) reject(err);
            else {
              console.log("📝 Dados de exemplo inseridos");
              resolve();
            }
          }
        );
      });
    }

    console.log("🎉 Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inicializar banco de dados:", error.message);

    // Tentar conexão alternativa sem senha
    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.log("🔑 Tentando conexão sem senha...");
      await tryConnectionWithoutPassword();
    }
  } finally {
    // Fechar conexões de forma segura
    if (initialConnection && initialConnection.state !== "disconnected") {
      initialConnection.end();
    }
    if (dbConnection && dbConnection.state !== "disconnected") {
      dbConnection.end();
    }
  }
}

// Função para tentar conexão sem senha
async function tryConnectionWithoutPassword() {
  let connection;

  try {
    connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "", // Tentar sem senha
      database: "eco_tasks",
    });

    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) reject(err);
        else {
          console.log("✅ Conectado ao MySQL sem senha!");
          resolve();
        }
      });
    });

    // Atualizar o arquivo de configuração
    const fs = await import("fs");
    const configContent = `const config = {
  database: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eco_tasks'
  }
};

export default config;`;

    fs.writeFileSync("./src/config/config.js", configContent);
    console.log("🔧 Configuração atualizada para conexão sem senha");

    connection.end();
  } catch (error) {
    console.error("❌ Também falhou sem senha:", error.message);
    console.log("\n💡 Soluções possíveis:");
    console.log("1. Verifique se o MySQL está rodando");
    console.log("2. Configure a senha no arquivo src/config/config.js");
    console.log("3. Execute: sudo mysql_secure_installation (Linux/Mac)");
    console.log("4. Ou reinstale o MySQL com configuração mais simples");
  }
}

// Executa a inicialização quando o módulo for importado
initializeDatabase();

export default initializeDatabase;
