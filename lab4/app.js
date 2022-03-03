var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars')
var hbs = require('handlebars')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { lookup } = require('dns');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.engine('hbs', exphbs.engine({
  defaultLayout:'layout',
  layoutsDir: 'views',
  extname:'hbs',
  helpers:{
      getShortComment(comment){
          if(comment.length < 64){
              return comment
          }
          return comment.substring(0,60) + "..."
      },
      makeBold(name){
          return "<strong>" + name + "</strong>"
      },
      formatPhoneNumber(number){
          return "("+number.substring(0,3)+")"+number.substring(3,6)+"-"+ number.substring(6,10)
      },
      formatEmailLink(email){
          return `<a href="mailto:${email}">${email}</a>`
      },
      formatCapitalize(word){
          return word.toUpperCase()
      },
      loop(){
        var options = new Array();
        var values = [3,4,5,10,20];
        for(let i = 0; i < 5; i++)
        {
            options[i] = new hbs.SafeString(`<option value="${values[i]}">${values[i]} x ${values[i]}</option>`);
        }
        return options;
      },
      tableLoop(size){
        var rows = [];
            var cells = [];
            for(let r = 0; r < size; r++)
            {
                cells[r] = [];
                for(let c = 0; c < size; c++)
                {
                    var color = ((1<<24)*Math.random()|0).toString(16);
                    if(color.length === 5){
                        color = "0" + color;
                    }
                        cells[r][c] = new hbs.SafeString(`<td style="background-color:#${color};padding:5px;">${color}<br><span style="color:#ffffff;">${color}</span></td>`);
                }
                rows[r] = new hbs.SafeString(`<tr>${cells[r]}</tr>`);
            }
        
            rows = rows.join("");
            rows = rows.replaceAll(",", "")
            var table = new hbs.SafeString(`<table>${rows}</table>`);
            return table;
      }

  }
}))

module.exports = app;
