const Img = require("../models/img");
const Note = require("../models/note");
const fs = require('fs');
const path = require('path');

class imgController {
  async create(req, res) {
    const { noteId } = req.params;

    try {
      const note = await Note.findByPk(noteId);
      if (!note) {
        return res.status(404).json({ status: 'error', message: 'Note not found' });
      }

      // Проверяем, были ли загружены изображения
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ status: 'error', message: 'No images uploaded' });
      }

      // Обрабатываем каждое изображение
      const images = [];
      for (const file of req.files) {
        const img = await Img.create({ imgPath: file.path });

        // Копируем изображение в папку public
        const filename = path.basename(file.path);
        const destination = path.join(__dirname, '..', '..', '..', 'Диплом', 'frontend', 'public', 'uploads', filename);

        try {
          await fs.promises.copyFile(file.path, destination);
          console.log('Image copied to public folder');
        } catch (err) {
          console.error('Error copying image to public folder:', err);
        }

        // Связываем изображение с заметкой
        await note.addImg(img);
        images.push(img);
      }

      res.json({ status: 'success', message: 'Images added to note', images: images });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }

  async getAll(req, res) {
    const { noteId } = req.params;

    try {
      const imgs = await Img.findAll({ where: { noteId } });
      res.json(imgs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      // Находим изображение по его id и удаляем его
      await Img.destroy({ where: { id } });

      res.json({ message: "Изображение удалено!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
}

module.exports = new imgController();
