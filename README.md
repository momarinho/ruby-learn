# 💎 Interactive Ruby & Ruby on Rails Developer Platform

A high-performance, 100% in-browser interactive learning platform designed to take students from complete programming beginners to full-stack Ruby on Rails developers.

The platform boots a real **CRuby 3.3 VM inside WebAssembly (via `ruby.wasm`)** and features a simulated full-stack Rails MVC suite, in-memory database, background worker dashboard, and an email sandbox inbox.

---

## 🚀 Key Features

*   **Native WebAssembly Ruby 3.3 Engine:** Code runs in a real Ruby VM, enabling full support for exceptions, blocks, Lambdas, refinements, and metaprogramming.
*   **ActiveRecord & Database Simulator:** Live database table inspector updating dynamically as students execute `Post.create` or write ActiveRecord relationships.
*   **Rails Request-Response Visualizer:** Simulates an HTTP Router and MVC dispatch cycle. Enter URLs in the address bar to watch requests route through controller actions to ERB templates.
*   **ActiveJob Queue Dashboard:** A simulated worker queue displaying deferred jobs enqueued via `WelcomeJob.perform_later`.
*   **ActionMailer Mailbox:** An integrated mailbox tab that catches outgoing emails in real-time, displaying raw formatting and metadata.
*   **Mock File System:** A simulated, in-memory file sandbox enabling file I/O operations (`File.read`, `File.write`, `Dir.glob`) without browser permission blocks.
*   **Built-in RSpec Runner:** Natively executes BDD test specifications to validate students' solutions with clean example feedback.

---

## 📚 Curriculum Structure (30 Modules, 168 Steps)

The curriculum is modularly divided across three separate data files under the `src/` directory to maintain light load footprints:

### 1. Ruby Language Foundations (Steps 1–82)
*   **Modules 1–5:** Variables, Operations, Control Flow, and Collection Types (Arrays & Hashes).
*   **Modules 6–9:** Loops, String Manipulation, Methods, and Basic OOP (Classes, Attributes).
*   **Module 10:** Advanced OOP (Access Modifiers: `private`/`protected`, Constants, and Exception subclasses).
*   **Modules 11–13:** Blocks, Procs, Lambdas, Exception Handling, File I/O, and Metaprogramming (`send`, `define_method`, `method_missing`).
*   **🏆 Project Checkpoint (Step 68): Capstone 1 - OO Task Manager CLI**

### 2. Rails MVC Core (Steps 83–138)
*   **Modules 14–16:** Rails MVC Architecture, Directory Structures, Router Basics, and Controllers callbacks / Strong Parameters.
*   **Modules 17–19:** Databases, Migrations, Active Record basics, CRUD operations, Scopes, and Table Aggregations.
*   **Modules 20–22:** Validations, model callbacks, Relationships (`has_many`, `belongs_to`, `has_many :through`), and View ERB Helpers (`form_with`, `yield`).
*   **🏆 Project Checkpoint (Step 136): Capstone 2 - RESTful Blog API Router & Controller**

### 3. Advanced Rails & Integrations (Steps 139–168)
*   **Modules 23–25:** Advanced OOP Metaprogramming (Eigenclasses, Method Lookup chain) and Asset pipelines.
*   **Modules 26–28:** ActionView components, Mailers, ActiveJob background workers, and Advanced ActiveRecord Joins/Transactions.
*   **Modules 29–30:** Hotwire (Turbo/Stimulus), Rails Security (XSS protection, CORS whitelisting), Rate Limiting, and containerized deployments.
*   **🏆 Project Checkpoint (Step 168): Capstone 3 - Full-Stack Social Feed**

---

## 🏆 Capstone Projects

The course contains **3 milestone capstone projects** verified by automated RSpec suites:

1.  **Project 1: Command-Line Task Manager:** Builds a object-oriented CLI application testing encapsulation, custom exceptions inheritance, array queries, and state management.
2.  **Project 2: RESTful Blog API Router & Controller:** Integrates custom REST resource definitions, strong parameters controller whitelists, and mock JSON endpoints.
3.  **Project 3: Full-Stack Social Feed:** Connects database relationships, model presence validations, enqueuing background welcome emails, and custom routing configurations.

---

## 🛠️ Local Development Setup

### Dependencies
Ensure you have [Node.js](https://nodejs.org/) installed to build Tailwind CSS.

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Rebuild Tailwind CSS assets:**
    ```bash
    npm run build
    ```

3.  **Start a local development server:**
    You can use Python, Ruby, or any static file server:
    ```bash
    # Using Ruby
    ruby -run -e httpd . -p 8000

    # Or using Python
    python3 -m http.server 8000
    ```

4.  **Access the application:**
    Open **[http://localhost:8000](http://localhost:8000)** in your browser.
