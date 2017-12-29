const fs = require('fs'),
  path = require('path');

const layoutExt = '.pug',
  views = path.join(__dirname, '../app/views');

const routers = (app, cb) => {
  app.get('/me', (req, res) => {
    res.send({
      app: 'Frontend template',
      version: '1.0.0'
    });
  });

  app.get('/', (req, res) => {
    res.render(views + '/index');
  });

  fs.readdir(views, (err, files) => {
    if (err) return;

    for (let i = 0, len = files.length; i < len; i++) {
      ((i) => {
        const file = files[i];

        if (path.extname(file) === layoutExt) {
          const fileName = path.basename(file, layoutExt);
          const pathFileName = fileName + '.html';
          app.get('/' + pathFileName, (req, res) => {
            res.render(views + '/' + fileName);
          });
        }
        if (i === len - 1) {
          typeof cb === 'function' && cb();
        }
      })(i);
    }
  });
};

module.exports = routers;
