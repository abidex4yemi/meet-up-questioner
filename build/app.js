"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _api = _interopRequireDefault(require("./routes/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize express app
var app = (0, _express.default)(); // body-parser Middleware

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json()); // cross origin resource sharing middleware

app.use((0, _cors.default)()); // Meet up  middleware

app.use('/api/v1/', _api.default); // Home page route

app.get('/', function (req, res) {
  res.json({
    status: 200,
    data: [{
      message: 'Welcome to Questioner Home Route'
    }]
  });
}); // Handle non exist route with with proper message

app.all('*', function (req, res) {
  res.status(404).json({
    status: 404,
    error: {
      message: 'Wrong request. Route does not exist'
    }
  });
}); // Define application port number

var port = process.env.PORT || 3000; // Start server

app.listen(port, function () {
  // eslint-disable no-console
  console.log("Server running on port ".concat(port));
}); // expose app to be use in another file

var _default = app;
exports.default = _default;
//# sourceMappingURL=app.js.map