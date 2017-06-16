// module.exports = function (grunt) {
//    grunt.initConfig({
//       babel: {
//         options: {
//           plugins: ['transform-react-jsx'],
//           presets: ['es2015', 'react']
//         },
//         jsx: {
//           files: [{
//             expand: true,
//             cwd: 'static/components/', // Custom folder
//             src: ['*.jsx'],
//             dest: 'static/js/', // Custom folder
//             ext: '.js'
//           }]
//         }
//       },
//       browserify: {
//          dist: {
//             // options: {
//             //    transform: [
//             //       ["babelify", {
//             //          loose: "all"
//             //       }]
//             //    ]
//             // },
//             files: {
//                // if the source file has an extension of es6 then
//                // we change the name of the source file accordingly.
//                // The result file's extension is always .js
//                "prod_assets/js/index.js": ["static/js/index.js"]
//             }
//          }
//       },
//       watch: {
//          scripts: {
//             files: ["static/js/*.js"],
//             tasks: ["browserify"]
//          }
//       }
//    });
//    grunt.loadNpmTasks('grunt-babel');
//    grunt.loadNpmTasks("grunt-browserify");
//    grunt.loadNpmTasks("grunt-contrib-watch");

//    grunt.registerTask("default", ["watch"]);
//    grunt.registerTask("build", ["browserify"]);
// };