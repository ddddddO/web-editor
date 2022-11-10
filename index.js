let select = document.getElementById('selectlang');
let pyodide;
const setupPy = async () => {
    pyodide = await loadPyodide()
    pyodide.runPython(`
        import sys
        import io
        sys.stdout = io.StringIO()
    `);
    console.log('setup done');
};
setupPy();

import { PhpWeb as PHP } from 'php-wasm/PhpWeb';
import { runYamlFmt } from "@js-yamlfmt/wasm";
window.run = (v) => {
    // TODO: 要リファクタ
    switch (select.value) {
        case "1":
            const phpWeb = new PHP;
            phpWeb.addEventListener('ready', () => {
                phpWeb.run(v);
                // phpWeb.run(`
                // <?php 
                //     echo "PHP!!";
                //     phpinfo();
                // `);
            });
            phpWeb.addEventListener('output', (event) => {
                console.log(event.detail);
        
                let result = document.getElementById("result");
                result.innerText = event.detail;
            });
            break;
        case "2":
            setupPy();

            pyodide.runPython(v);

            const stdout = pyodide.runPython("sys.stdout.getvalue()");

            let result = document.getElementById("result");
            result.innerText = stdout;
            break;
        case "3":
            console.log('yamlfmt');
            const formatted = runYamlFmt(v);
            let resultYaml = document.getElementById("result");
            formatted.then(
                (data) => {
                    resultYaml.innerText = data;
                })
                .catch((err) => {
                    resultYaml.innerText = err;
                });
            break;
    }
};

import * as monaco from 'monaco-editor';
let editor = monaco.editor.create(document.getElementById('container'), {
        value: ['<?php', 'echo "Hello World!";'].join('\n'),
        language: 'php'
    });

window.get = () => {
  console.log(editor.getValue());
  return editor.getValue();
};

select.addEventListener('change', (event) => {
    // TODO: 要リファクタ
    switch (event.target.value) {
        case "1":
            const modelPHP = monaco.editor.createModel(
                ['<?php', 'echo "Hello World!";'].join('\n'),
                'php',
            );
            editor.setModel(modelPHP);
            break;
        case "2":
            const modelPython = monaco.editor.createModel(
                ['print("Hello World!")'].join('\n'),
                'python',
            );
            editor.setModel(modelPython);
            break;
        case "3":
            const modelYAML = monaco.editor.createModel(
                ['user:', '- name: piyota', 'age: 18', 'mail:', '- piyota@example.com', '- piyopiyo@example.com'].join('\n'),
                'yaml',
            );
            editor.setModel(modelYAML);
            break;
    }
});

document.getElementById("selectlang").disabled = false;
document.getElementById("run").disabled = false;
