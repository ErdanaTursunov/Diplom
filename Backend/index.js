const express = require('express');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notes');
const cors = require('cors');
const sequelize = require('./db');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));
app.use('/uploads', express.static('uploads'));


app.use(express.json());


// Использование маршрутов для заметок
app.use('/notes', notesRoutes);

// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Синхронизация таблицы Note завершена');
//   })
//   .catch((error) => {
//     console.error('Ошибка синхронизации таблицы Note:', error);
//   });

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
