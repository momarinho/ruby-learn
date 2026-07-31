# Ruby for Beginners: Interactive Learning Platform

Welcome to the **Ruby for Beginners** interactive learning platform! This self-contained, single-page web application is designed in a **FreeCodeCamp-style layout** to teach Ruby foundations directly from the browser. It features 10 syllabus chapters, 50 coding challenges with real-time test validation, inline quizzes, and a stateful in-browser Ruby IRB REPL terminal emulator.

---

## 🚀 Key Features

* **Complete 50-Step Curriculum:** 10 syllabus lessons grouped into 5 exercises each (from outputting basics with `puts` to class inheritance in OOP).
* **Live IRB Shell:** An interactive Ruby terminal REPL that preserves variable state, function bindings, and expressions across commands.
* **Instant Code Validator:** Real-time syntax and test output checking against exercise rules using a sandboxed browser execution environment.
* **LMS Progress Tracking:** Inline knowledge check quizzes for reinforcement, dynamic progress metrics, and progress persistence using `localStorage`.
* **Completion Certificate:** Awarded automatically as a printable modal dialog upon finishing all 50 challenges.

---

## 🛠️ Technology Stack

1. **Frontend:** Pure HTML5 structure & Vanilla ES6 JavaScript logic.
2. **Icons:** FontAwesome 6 icons.
3. **Styling:** Tailwind CSS v3 (configured locally and compiled via Tailwind CLI).
4. **Local Server:** Ruby's built-in `webrick` server runner.

---

## 📁 Project Structure

```text
ruby-beginner-platform/
├── dist/
│   └── output.css       # Compiled & minified production stylesheet
├── src/
│   └── input.css        # Core Tailwind directives
├── index.html           # Main Single-Page Application (HTML, JS, and CSS)
├── package.json         # Tailwind devDependencies and scripts
├── tailwind.config.js   # Local Tailwind theme & color configurations
└── README.md            # Project documentation
```

---

## 💻 Getting Started

### 1. Prerequisites
Ensure you have **Ruby** installed (version 3.0+). You'll need `webrick` to run the server. If not already installed, run:
```bash
gem install webrick
```

### 2. Run the Application
Start the native Ruby static file server:
```bash
ruby -run -e httpd . -p 8000
```
Open your browser and navigate to **[http://localhost:8000](http://localhost:8000)** to start learning!

---

## 🎨 Tailwind CSS CSS-in-JS compilation

If you make modifications to the styling in `index.html`, you will need to recompile the Tailwind assets. 

If Node/npm is not in your global system `PATH` but you have it installed under your code editor (e.g. Zed), you can prepend it:

* **Build minified CSS:**
  ```bash
  PATH="$HOME/.local/share/zed/node/node-v24.11.0-linux-x64/bin:$PATH" npm run build
  ```
* **Watch classes dynamically:**
  ```bash
  PATH="$HOME/.local/share/zed/node/node-v24.11.0-linux-x64/bin:$PATH" npm run watch
  ```

---

## ⚙️ How the Browser Ruby VM Works
Because browsers only run JavaScript natively, the platform runs a customized **Ruby-to-JavaScript transpiler** under the hood:
- **Block-Stack Parser:** Transpiles Ruby's `do ... end` and `{ ... }` blocks into JavaScript ES6 arrow functions.
- **Stateful IRB Proxy Sandbox:** Executes code within a `with(Proxy)` wrapper block so that assignments (`x = 10`) dynamically bind to a persistent context dictionary.
- **Prototype Methods:** Extends standard JavaScript types (`Array`, `String`, `Number`, `Object`) with non-enumerable methods to mirror Ruby features (such as `each_with_index`, `uniq`, `compact`, `upcase!`, `reduce`, `select`, etc.) natively in JS.
