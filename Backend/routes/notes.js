// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const multer = require('multer');
const Img = require('../models/img');
const imgcontroller = require('../controller.js/imgcontroller');



// Создание заметки
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.create({
      title: title !== undefined ? title : null,
      content: content !== undefined ? content : null
    });
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Получение всех заметок
router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


// Получение всех заметок
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ where: { id: id} });
    if (!note) {
      return res.status(404).json({ status: 'invalid', message: 'Заметки нету' });
    }

    await Note.destroy({ where: { id } });

    res.json({message:"Удалено заметки "});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    let note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ status: 'error', message: 'Note not found' });
    }
    note.title = title;
    note.content = content;
    await note.save();
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Настройка хранилища для загружаемых файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Папка назначения для сохранения загруженных файлов
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Генерация уникального имени файла
  }
}); 

// Опции загрузки файлов
const upload = multer({ storage: storage });


router.get('/:noteId/images', imgcontroller.getAll);
router.post('/:noteId/images', upload.array('image'), imgcontroller.create);
router.delete('/images/:id', upload.single('image'), imgcontroller.delete);



module.exports = router;
