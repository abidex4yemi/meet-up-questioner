module.exports = {
    "extends": "airbnb-base",
     rules: {
       "no-bitwise": "off",
       "no-mixed-operators": 0,
       "linebreak-style": ["error", "windows"]
     },
     "env": {
       "mocha": true,
       "node": true,
       "browser": true,
     },
};