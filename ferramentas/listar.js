// node ferramentas/listar.js <pasta>  → lista os slides de uma aula
const fs = require("fs"), vm = require("vm");
const c = { window: {} }; vm.createContext(c);
vm.runInContext(fs.readFileSync(process.argv[2] + "/content.js", "utf8") + ";this.S=S;this.LESSON=LESSON;", c);
c.S.forEach((s, i) => console.log(i + 1, s.type, (s.title || s.subj || s.menu || "").slice(0, 70)));
