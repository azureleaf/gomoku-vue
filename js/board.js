// Define component here
// Writing template with template literal (``) sucks! Awful readability, no linting
// Before pasting the code here, you better write the template code somewhere to ensure it works
var ProjectTable = Vue.component("board", {
  template: `<div>{{msg}}</div>`,
  data: function () {
    return {
      msg: "hello, world!",
    };
  },
  methods: {},
});
