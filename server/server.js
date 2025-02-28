require('dotenv').config(); // Importar dotenv al inicio
const express = require('express');
const cors = require('cors');
const connection = require('./db.js');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // Parsear cuerpos JSON
app.use(express.static(path.join(__dirname, '../public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Configuramos multer para aceptar dos campos de imagen
const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'bannerImage', maxCount: 1 }
]);

// Ruta para obtener todos los espectáculos
app.get('/api/shows', (req, res) => {
  connection.query('SELECT * FROM shows ORDER BY date ASC', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener los espectáculos' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para cargar un nuevo show
app.post('/api/shows', uploadFields, (req, res) => {
  const { name, description, price, mes, date, hora, link } = req.body;
  
  const imagePath = req.files['image'] ? req.files['image'][0].filename : null;
  const bannerImagePath = req.files['bannerImage'] ? req.files['bannerImage'][0].filename : null;

  connection.query(
    'INSERT INTO shows (name, description, price, mes, date, hora, image, bannerImage, link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, description, price, mes, date, hora, imagePath, bannerImagePath, link],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al guardar el espectáculo' });
      }
      res.status(200).json({ message: 'Show guardado exitosamente', showId: result.insertId });
    }
  );
});

// Ruta para actualizar un espectáculo
app.put('/api/shows/:id', uploadFields, (req, res) => {
  const { id } = req.params;
  const { name, description, price, mes, date, hora, link } = req.body;
  const imagePath = req.files['image'] ? req.files['image'][0].filename : req.body.imagePath;
  const bannerImagePath = req.files['bannerImage'] ? req.files['bannerImage'][0].filename : req.body.bannerImagePath;

  connection.query(
    'UPDATE shows SET name = ?, description = ?, price = ?, mes = ?, date = ?, hora = ?, image = ?, bannerImage = ?, link = ? WHERE id_show = ?',
    [name, description, price, mes, date, hora, imagePath, bannerImagePath, link, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al actualizar el espectáculo' });
      }
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Espectáculo actualizado correctamente' });
      } else {
        res.status(404).json({ message: 'Espectáculo no encontrado' });
      }
    }
  );
});

// Ruta para eliminar un espectáculo
app.delete('/api/shows/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM shows WHERE id_show = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el espectáculo' });
    }
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Espectáculo eliminado' });
    } else {
      res.status(404).json({ message: 'Espectáculo no encontrado' });
    }
  });
});

// Ruta para obtener el próximo show
app.get('/api/next-show', (req, res) => {
  connection.query(
    'SELECT * FROM shows WHERE date >= CURDATE() ORDER BY date ASC LIMIT 1',
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error al obtener el próximo espectáculo' });
      }
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'No hay espectáculos próximos' });
      }
    }
  );
});

// Ruta para obtener un espectáculo específico por ID
app.get('/api/shows/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM shows WHERE id_show = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener el espectáculo' });
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Espectáculo no encontrado' });
    }
  });
});

// Configuración del transporter para nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verifica la conexión del transporter al iniciar el servidor
transporter.verify((error, success) => {
  if (error) {
    console.error("Error en la configuración de nodemailer:", error);
  } else {
    console.log("Nodemailer configurado correctamente");
  }
});

// Ruta para enviar el correo
app.post('/api/contact', async (req, res) => {
  const { subject, name, email, message } = req.body;

  // Validar que todos los campos estén presentes
  if (!subject || !name || !email || !message) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const mailOptions = {
    from: email, // Correo del remitente (usuario)
    to: "teatropigue@gmail.com", // Destinatario fijo
    subject: `Nuevo mensaje: ${subject}`,
    text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el mensaje", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});