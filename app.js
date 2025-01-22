
const express = require('express');
const db = require('./config/db'); 

const app = express();
const port=3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('App Express in esecuzione!');
});

//GET
app.get('/posts', async (req, res) => {
  try {

    const [rows, fields] = await db.execute('SELECT * FROM db_blog.posts');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero dei post' });
  }
});

app.listen(port, () => {
  console.log(`Server in esecuzione sulla porta ${port}`);
});

// DELETE
app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id; 
  
    db.execute('DELETE FROM posts WHERE id = ?', [postId])
      .then(result => {
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Post non trovato' });
        }
        res.status(204).send(); 
      })
      .catch(err => {
        res.status(500).json({ error: 'Errore nell\'eliminazione del post' });
      });
  });

  //SHOW POST

  app.get('/posts/:id', async (req, res) => {
    const postId = req.params.id; 
  
    try {
      const [rows] = await db.execute('SELECT * FROM db_blog.posts WHERE id = ?', [postId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Post non trovato' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Errore nel recupero del post' });
    }
  });