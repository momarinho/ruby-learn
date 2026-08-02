// Curriculum Data Part 1: Lessons 1 to 15 (Steps 1 to 75)
const lessonsDataPart1 = [
  {
    id: 1,
    title: "Ruby Scripts & IRB",
    duration: "20 min",
    theory: `
      <p>Ruby is an interpreted, object-oriented programming language designed for productivity and natural syntax. Ruby code can be executed in script files (<code>.rb</code>) or interactively using <strong>IRB (Interactive Ruby)</strong>.</p>
      <h4 class="text-xs font-bold text-slate-200 mt-2">Printing Output Methods:</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li><code>puts</code>: Outputs text and appends a new line.</li>
        <li><code>print</code>: Outputs text on the same line without a newline.</li>
        <li><code>p</code>: Prints inspected representation (useful for debugging quotes & arrays).</li>
        <li><code><<~HEREDOC</code>: Multi-line strings maintaining clean indentation.</li>
      </ul>
    `,
    exercises: [
      {
        stepNumber: 1,
        level: "Warm-Up",
        title: "1. Basic Output with puts",
        prompt: "Use <code>puts</code> to print <code>'Hello, Ruby!'</code> to the terminal console.",
        initialCode: `# Step 1: Write your puts statement below:\n`,
        hint: "Write: puts 'Hello, Ruby!'",
        solution: "puts 'Hello, Ruby!'",
        validate: (out) => out.includes("Hello, Ruby!"),
        quiz: {
          question: "Which method outputs text and automatically appends a new line character?",
          options: ["print", "puts", "p", "echo"],
          correct: 1,
          rationale: "<code>puts</code> automatically appends a newline character after printing."
        }
      },
      {
        stepNumber: 2,
        level: "Core Practice",
        title: "2. Combining print and puts",
        prompt: "Use <code>print</code> to output <code>'Created by '</code> and then <code>puts</code> to output <code>'Matz'</code> on the same line.",
        initialCode: `# Step 2: Use print then puts\n`,
        hint: "print 'Created by '\\nputs 'Matz'",
        solution: "print 'Created by '\nputs 'Matz'",
        validate: (out) => out.includes("Created by Matz"),
        quiz: {
          question: "How does the output of the <code>print</code> method differ from <code>puts</code>?",
          options: ["It converts all objects to JSON", "It does not automatically append a newline", "It only prints numbers", "It writes to standard error instead"],
          correct: 1,
          rationale: "Unlike <code>puts</code>, <code>print</code> does not append a newline character to the output."
        }
      },
      {
        stepNumber: 3,
        level: "Core Practice",
        title: "3. Inspected Output with p",
        prompt: "Use <code>p</code> to print the year <code>2026</code>.",
        initialCode: `# Step 3: Use p to output 2026\n`,
        hint: "p 2026",
        solution: "p 2026",
        validate: (out) => out.includes("2026"),
        quiz: {
          question: "Which printing method is best suited for debugging as it outputs the raw, inspected representation of an object?",
          options: ["puts", "print", "p", "echo"],
          correct: 2,
          rationale: "The <code>p</code> method prints the result of calling <code>.inspect</code> on an object, which is useful for debugging strings, arrays, and classes."
        }
      },
      {
        stepNumber: 4,
        level: "Core Practice",
        title: "4. Expressions in Output",
        prompt: "Use <code>puts</code> to output the calculated result of <code>50 + 50</code>.",
        initialCode: `# Step 4: Output calculation:\n`,
        hint: "puts 50 + 50",
        solution: "puts 50 + 50",
        validate: (out) => out.includes("100"),
        quiz: {
          question: "What will <code>puts 50 + 50</code> output to the console?",
          options: ["50 + 50", "100", "nil", "A syntax error"],
          correct: 1,
          rationale: "Ruby evaluates the mathematical expression to <code>100</code> before sending it to the printing function."
        }
      },
      {
        stepNumber: 5,
        level: "Challenge",
        title: "5. Multi-line Heredoc Output",
        prompt: "Print a multi-line output containing both words <code>'Ruby'</code> and <code>'Awesome'</code> using <code>puts</code>.",
        initialCode: `# Step 5: Output multi-line string:\n`,
        hint: 'puts "Ruby\\nIs\\nAwesome"',
        solution: 'puts "Ruby\\nIs\\nAwesome"',
        validate: (out) => out.includes("Ruby") && out.includes("Awesome"),
        quiz: {
          question: "What symbol denotes a Heredoc identifier block for writing indented multi-line strings?",
          options: ["<<~", "||", "%Q", ">>>"],
          correct: 0,
          rationale: "The <code><<~</code> squiggly heredoc operator strips leading indentation, making multi-line text files look clean."
        }
      }
    ]
  },
  {
    id: 2,
    title: "Strings in Ruby",
    duration: "25 min",
    theory: `
      <p>Strings are sequences of characters wrapped in double quotes <code>"..."</code> or single quotes <code>'...'</code>.</p>
      <h4 class="text-xs font-bold text-slate-200 mt-2">String Interpolation & Slicing:</h4>
      <p>Double quotes evaluate Ruby code inside <code>\#{expression}</code>. You can slice strings with ranges <code>string[0..3]</code> or trim whitespace with <code>.strip</code>.</p>
    `,
    exercises: [
      {
        stepNumber: 6,
        level: "Warm-Up",
        title: "6. String Interpolation",
        prompt: "Given <code>name = 'Alice'</code>, output <code>'Hello, Alice!'</code> using string interpolation.",
        initialCode: `name = "Alice"\n# Write puts statement with interpolation:\n`,
        hint: 'puts "Hello, #{name}!"',
        solution: 'name = "Alice"\nputs "Hello, #{name}!"',
        validate: (out) => out.includes("Hello, Alice!"),
        quiz: {
          question: "Which quote style supports string interpolation \#{...} in Ruby?",
          options: ["Single quotes ' '", "Double quotes \" \"", "Backticks ` `", "None of the options"],
          correct: 1,
          rationale: "Only double-quoted strings perform variable interpolation in Ruby."
        }
      },
      {
        stepNumber: 7,
        level: "Core Practice",
        title: "7. Uppercase Transformation",
        prompt: "Given <code>framework = 'rails'</code>, print <code>'I USE RAILS'</code> using <code>.upcase</code> inside interpolation.",
        initialCode: `framework = "rails"\n`,
        hint: 'puts "I USE #{framework.upcase}"',
        solution: 'framework = "rails"\nputs "I USE #{framework.upcase}"',
        validate: (out) => out.includes("I USE RAILS"),
        quiz: {
          question: "What does calling <code>.upcase</code> on a string return?",
          options: ["The string reversed", "The string transformed to uppercase", "The string's length", "An integer representation"],
          correct: 1,
          rationale: "<code>.upcase</code> transforms all alphabetic characters in a string to uppercase."
        }
      },
      {
        stepNumber: 8,
        level: "Core Practice",
        title: "8. Reversing and Length",
        prompt: "Given <code>word = 'Developer'</code>, output its reverse and length separated by space (e.g. <code>repoleveD 9</code>).",
        initialCode: `word = "Developer"\n`,
        hint: 'puts "#{word.reverse} #{word.length}"',
        solution: 'word = "Developer"\nputs "#{word.reverse} #{word.length}"',
        validate: (out) => out.includes("repoleveD 9"),
        quiz: {
          question: "Which method is used to get the total number of characters in a string?",
          options: [".size", ".reverse", ".count", ".length"],
          correct: 3,
          rationale: "Both <code>.length</code> (and <code>.size</code>) return the integer character count of a string."
        }
      },
      {
        stepNumber: 9,
        level: "Core Practice",
        title: "9. String Repetition",
        prompt: "Multiply the string <code>'Ruby '</code> by <code>3</code> and print the repeated string.",
        initialCode: `# Multiply string by 3 and puts:\n`,
        hint: "puts 'Ruby ' * 3",
        solution: "puts 'Ruby ' * 3",
        validate: (out) => out.includes("Ruby Ruby Ruby"),
        quiz: {
          question: "What operator is used to repeat a string multiple times in Ruby?",
          options: ["+", "*", "^", "x"],
          correct: 1,
          rationale: "Multiplying a string by an integer (e.g., <code>'Ruby ' * 3</code>) repeats the string."
        }
      },
      {
        stepNumber: 10,
        level: "Challenge",
        title: "10. Trimming Whitespace",
        prompt: "Given <code>text = '  Ruby on Rails  '</code>, print the string cleaned of extra surrounding space using <code>.strip</code>.",
        initialCode: `text = "  Ruby on Rails  "\n`,
        hint: "puts text.strip",
        solution: 'text = "  Ruby on Rails  "\nputs text.strip',
        validate: (out) => out.includes("Ruby on Rails"),
        quiz: {
          question: "Which method strips all surrounding whitespace and newlines from a string?",
          options: [".clean", ".trim", ".strip", ".clear"],
          correct: 2,
          rationale: "The <code>.strip</code> method returns a copy of the string with leading and trailing whitespace removed."
        }
      }
    ]
  },
  {
    id: 3,
    title: "Integers & Floats in Ruby",
    duration: "15 min",
    theory: `
      <p>Ruby provides numeric classes like <code>Integer</code> and <code>Float</code>. Conversion can be done using <code>.to_i</code> or <code>.to_f</code>.</p>
    `,
    exercises: [
      {
        stepNumber: 11,
        level: "Warm-Up",
        title: "11. Basic Arithmetic",
        prompt: "Perform and print the sum of <code>15</code>, <code>25</code>, and <code>30</code>.",
        initialCode: `# Print the sum:\n`,
        hint: "puts 15 + 25 + 30",
        solution: "puts 15 + 25 + 30",
        validate: (out) => out.includes("70"),
        quiz: {
          question: "Which operator represents addition in Ruby?",
          options: ["+", "-", "*", "/"],
          correct: 0,
          rationale: "The <code>+</code> sign is the arithmetic operator for addition."
        }
      },
      {
        stepNumber: 12,
        level: "Core Practice",
        title: "12. Float Division",
        prompt: "Divide <code>10</code> by <code>4.0</code> to output a floating-point decimal quotient.",
        initialCode: `# Print decimal result:\n`,
        hint: "puts 10 / 4.0",
        solution: "puts 10 / 4.0",
        validate: (out) => out.includes("2.5"),
        quiz: {
          question: "What happens when you divide two Integers (e.g. <code>10 / 4</code>) in Ruby?",
          options: ["It returns a Float (2.5)", "It performs integer division, truncating to 2", "It throws a TypeError", "It rounds to 3"],
          correct: 1,
          rationale: "Integer division truncates decimal parts. To get a float result, at least one operand must be a Float (e.g. <code>10 / 4.0</code>)."
        }
      },
      {
        stepNumber: 13,
        level: "Core Practice",
        title: "13. Converting String to Integer",
        prompt: "Convert string <code>'42'</code> to an Integer using <code>.to_i</code>, multiply it by <code>2</code>, and print the result.",
        initialCode: `str = "42"\n`,
        hint: "puts str.to_i * 2",
        solution: 'str = "42"\nputs str.to_i * 2',
        validate: (out) => out.includes("84"),
        quiz: {
          question: "Which conversion method returns an Integer representation in Ruby?",
          options: [".to_i", ".to_f", ".to_s", ".to_a"],
          correct: 0,
          rationale: "<code>.to_i</code> parses a string (or float) and returns an Integer."
        }
      },
      {
        stepNumber: 14,
        level: "Core Practice",
        title: "14. Modulo Remainder",
        prompt: "Print the remainder of <code>13</code> divided by <code>5</code> using the modulo operator (<code>%</code>).",
        initialCode: `# Print modulo result:\n`,
        hint: "puts 13 % 5",
        solution: "puts 13 % 5",
        validate: (out) => out.includes("3"),
        quiz: {
          question: "What does the modulo operator <code>%</code> calculate?",
          options: ["Integer quotient", "Square root", "Division remainder", "Exponential power"],
          correct: 2,
          rationale: "Modulo returns the remainder of the division between the left and right numbers."
        }
      },
      {
        stepNumber: 15,
        level: "Challenge",
        title: "15. Absolute Values",
        prompt: "Given <code>val = -100</code>, call the absolute helper method <code>.abs</code> to print its positive magnitude.",
        initialCode: `val = -100\n`,
        hint: "puts val.abs",
        solution: "val = -100\nputs val.abs",
        validate: (out) => out.includes("100"),
        quiz: {
          question: "What does calling <code>.abs</code> on a number do?",
          options: ["Rounds it", "Returns absolute positive value", "Converts to a float", "Finds the square root"],
          correct: 1,
          rationale: "<code>.abs</code> returns the absolute value of the number, converting negative numbers to positive."
        }
      }
    ]
  },
  {
    id: 4,
    title: "Arrays in Ruby",
    duration: "25 min",
    theory: `
      <p>Arrays are ordered, integer-indexed collections of elements. They support insertion via shovel operator <code><<</code>, sorting, and cleaning.</p>
    `,
    exercises: [
      {
        stepNumber: 16,
        level: "Warm-Up",
        title: "16. Array Shovel Operator",
        prompt: "Initialize an empty array <code>items = []</code>, shovel <code>'Ruby'</code> into it, and print the array.",
        initialCode: `items = []\n# Shovel 'Ruby' into items and puts items:\n`,
        hint: "items << 'Ruby'\nputs items",
        solution: "items = []\nitems << 'Ruby'\nputs items",
        validate: (out) => out.includes("Ruby"),
        quiz: {
          question: "Which operator is commonly used to append elements to the end of a Ruby array?",
          options: ["<<", "++", "+=", "push_element"],
          correct: 0,
          rationale: "The shovel operator <code><<</code> appends the right-hand operand to the array."
        }
      },
      {
        stepNumber: 17,
        level: "Core Practice",
        title: "17. Sorting Arrays",
        prompt: "Given <code>nums = [5, 2, 8]</code>, print the sorted array.",
        initialCode: `nums = [5, 2, 8]\n`,
        hint: "puts nums.sort",
        solution: "nums = [5, 2, 8]\nputs nums.sort",
        validate: (out) => out.replace(/\s+/g, '').includes("258"),
        quiz: {
          question: "Does the standard <code>.sort</code> method modify the receiver array in-place?",
          options: ["Yes, it mutates the array", "No, it returns a new sorted array copy", "Only if it contains strings", "It does not sort at all"],
          correct: 1,
          rationale: "<code>.sort</code> returns a new, sorted array. Use <code>.sort!</code> if you want in-place mutation."
        }
      },
      {
        stepNumber: 18,
        level: "Core Practice",
        title: "18. Array Membership",
        prompt: "Check if the item <code>'gems'</code> is inside array <code>basket = ['ruby', 'diamonds']</code> using <code>.include?</code> and print the boolean result.",
        initialCode: `basket = ["ruby", "diamonds"]\n`,
        hint: "puts basket.include?('gems')",
        solution: 'basket = ["ruby", "diamonds"]\nputs basket.include?("gems")',
        validate: (out) => out.includes("false"),
        quiz: {
          question: "Which predicate method checks if an element exists inside a Ruby array?",
          options: [".has?", ".exists?", ".include?", ".contains?"],
          correct: 2,
          rationale: "<code>.include?</code> checks array membership and returns true or false."
        }
      },
      {
        stepNumber: 19,
        level: "Core Practice",
        title: "19. First & Last Elements",
        prompt: "Given <code>arr = ['a', 'b', 'c']</code>, print the first and last elements separated by a space.",
        initialCode: `arr = ["a", "b", "c"]\n`,
        hint: "puts \"#{arr.first} #{arr.last}\"",
        solution: 'arr = ["a", "b", "c"]\nputs "#{arr.first} #{arr.last}"',
        validate: (out) => out.includes("a c"),
        quiz: {
          question: "How do you access the first element of an array?",
          options: ["arr.begin", "arr.start", "arr.first", "arr.head"],
          correct: 2,
          rationale: "Ruby arrays have <code>.first</code> and <code>.last</code> helper methods."
        }
      },
      {
        stepNumber: 20,
        level: "Challenge",
        title: "20. Cleaning Arrays",
        prompt: "Given <code>dirty = [1, nil, 2, 2, nil]</code>, print the array with both duplicate and nil values removed (using <code>.compact</code> and <code>.uniq</code>).",
        initialCode: `dirty = [1, nil, 2, 2, nil]\n`,
        hint: "puts dirty.compact.uniq",
        solution: "dirty = [1, nil, 2, 2, nil]\nputs dirty.compact.uniq",
        validate: (out) => out.replace(/\s+/g, '').includes("12") && !out.includes("nil"),
        quiz: {
          question: "Which method filters out all <code>nil</code> values from an array?",
          options: [".uniq", ".clean", ".compact", ".strip"],
          correct: 2,
          rationale: "<code>.compact</code> returns a new array with all `nil` values removed."
        }
      }
    ]
  },
  {
    id: 5,
    title: "Hashes in Ruby",
    duration: "25 min",
    theory: `
      <p>Hashes represent collections of key-value pairs, often initialized using symbol keys (e.g. <code>{ name: "Alice" }</code>).</p>
    `,
    exercises: [
      {
        stepNumber: 21,
        level: "Warm-Up",
        title: "21. Accessing Hash Values",
        prompt: "Given <code>user = { name: 'Alice', role: 'Dev' }</code>, print the value of key <code>:name</code>.",
        initialCode: `user = { name: "Alice", role: "Dev" }\n`,
        hint: "puts user[:name]",
        solution: 'user = { name: "Alice", role: "Dev" }\nputs user[:name]',
        validate: (out) => out.includes("Alice"),
        quiz: {
          question: "What happens if you try to retrieve a missing key from a Hash using square brackets?",
          options: ["Raises an error", "Returns nil", "Returns false", "Creates the key automatically"],
          correct: 1,
          rationale: "Accessing missing keys via brackets returns <code>nil</code> unless the hash has a default configured value."
        }
      },
      {
        stepNumber: 22,
        level: "Core Practice",
        title: "22. Adding Hash Keys",
        prompt: "Given empty hash <code>config = {}</code>, add key <code>:port</code> with value <code>3000</code> and print the hash.",
        initialCode: `config = {}\n`,
        hint: "config[:port] = 3000\nputs config",
        solution: "config = {}\nconfig[:port] = 3000\nputs config",
        validate: (out) => out.includes("port") && out.includes("3000"),
        quiz: {
          question: "How do you assign key-value pairs to a Hash?",
          options: ["hash.push(key, value)", "hash[key] = value", "hash << [key, value]", "hash.add(key, value)"],
          correct: 1,
          rationale: "Brackets combined with assignment (<code>hash[key] = value</code>) sets or updates key values."
        }
      },
      {
        stepNumber: 23,
        level: "Core Practice",
        title: "23. Hash Key Lookup",
        prompt: "Check if hash <code>data = { x: 1 }</code> contains key <code>:y</code> using <code>.key?</code> and print the boolean.",
        initialCode: `data = { x: 1 }\n`,
        hint: "puts data.key?(:y)",
        solution: "data = { x: 1 }\nputs data.key?(:y)",
        validate: (out) => out.includes("false"),
        quiz: {
          question: "Which of the following checks if a key exists in a Hash?",
          options: [".has_key?", ".key?", ".include?", "All options are correct"],
          correct: 3,
          rationale: "<code>.key?</code>, <code>.has_key?</code>, and <code>.include?</code> are all synonymous in Hash classes."
        }
      },
      {
        stepNumber: 24,
        level: "Core Practice",
        title: "24. Merging Hashes",
        prompt: "Merge hash <code>h1 = { a: 1 }</code> with <code>h2 = { b: 2 }</code> using <code>.merge</code> and print the resulting hash.",
        initialCode: `h1 = { a: 1 }\nh2 = { b: 2 }\n`,
        hint: "puts h1.merge(h2)",
        solution: "h1 = { a: 1 }\nh2 = { b: 2 }\nputs h1.merge(h2)",
        validate: (out) => out.includes("a") && out.includes("b"),
        quiz: {
          question: "If both hashes contain key <code>:x</code>, which value wins in <code>h1.merge(h2)</code>?",
          options: ["The value from h1", "The value from h2", "It throws an error", "Both values are kept in an array"],
          correct: 1,
          rationale: "By default, the parameter hash (<code>h2</code>) overwrites duplicate keys of the receiver hash (<code>h1</code>)."
        }
      },
      {
        stepNumber: 25,
        level: "Challenge",
        title: "25. Safe Key Fetching",
        prompt: "Retrieve key <code>:secret</code> from hash <code>meta = {}</code> safely using <code>.fetch(:secret, 'Unknown')</code> and print it.",
        initialCode: `meta = {}\n`,
        hint: "puts meta.fetch(:secret, 'Unknown')",
        solution: "meta = {}\nputs meta.fetch(:secret, 'Unknown')",
        validate: (out) => out.includes("Unknown"),
        quiz: {
          question: "Which method retrieves a key from a Hash but raises a KeyError if it's missing (unless a fallback value is supplied)?",
          options: ["[]", "fetch", "get", "retrieve"],
          correct: 1,
          rationale: "<code>fetch</code> strictly retrieves a key, throwing a KeyError unless you provide a fallback argument."
        }
      },
      {
        stepNumber: 26,
        level: "Mini-Project",
        title: "26. Mini-Project: CLI Tip Calculator",
        prompt: `Build a method <code>calculate_tip(total, quality)</code> that calculates the total bill (amount + tip) to pay based on service quality:
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li><code>:excellent</code> ➔ 20% tip</li>
            <li><code>:good</code> ➔ 15% tip</li>
            <li><code>:fair</code> ➔ 10% tip</li>
            <li>Any other value ➔ 5% tip</li>
          </ul>
          Return the total as a rounded Float (using <code>.round(2)</code>).`,
        initialCode: `def calculate_tip(total, quality)
  # Write your logic here:
end`,
        hint: `rate = case quality\nwhen :excellent then 0.20\nelse 0.05\nend\n(total * (1 + rate)).round(2)`,
        solution: `def calculate_tip(total, quality)
  rate = case quality
         when :excellent then 0.20
         when :good then 0.15
         when :fair then 0.10
         else 0.05
         end
  (total * (1 + rate)).round(2)
end`,
        validate: (out, code) => {
          try {
            const r = window.rubyVM.eval("calculate_tip(100, :excellent) == 120.0 && calculate_tip(50, :good) == 57.5").toString();
            return r === "true";
          } catch(e) {
            return false;
          }
        },
        quiz: {
          question: "Which control flow statement is cleanest to match symbols against specific tip rate scales?",
          options: ["if/elsif", "case/when", "unless", "while loop"],
          correct: 1,
          rationale: "<code>case/when</code> is clean and readable for comparing a single variable against multiple potential symbol branches."
        }
      }
    ]
  },
  {
    id: 6,
    title: "Conditionals in Ruby",
    duration: "20 min",
    theory: `
      <p>Ruby provides <code>if</code>, <code>elsif</code>, <code>else</code>, and <code>unless</code> (opposite of if) to handle conditional branching.</p>
    `,
    exercises: [
      {
        stepNumber: 27,
        level: "Warm-Up",
        title: "27. Simple if / else",
        prompt: "Given <code>age = 20</code>, use <code>if/else</code> statement to print <code>'Adult'</code> if age is 18 or older, else print <code>'Minor'</code>.",
        initialCode: `age = 20\n`,
        hint: "if age >= 18\n  puts 'Adult'\nelse\n  puts 'Minor'\nend",
        solution: "age = 20\nif age >= 18\n  puts 'Adult'\nelse\n  puts 'Minor'\nend",
        validate: (out) => out.includes("Adult"),
        quiz: {
          question: "What keyword closes a conditional block in Ruby?",
          options: ["done", "endif", "end", "}"],
          correct: 2,
          rationale: "Conditional statements, classes, and methods are closed with the <code>end</code> keyword."
        }
      },
      {
        stepNumber: 28,
        level: "Core Practice",
        title: "28. The unless Keyword",
        prompt: "Given boolean <code>logged_in = false</code>, write an <code>unless</code> condition to print <code>'Please Login'</code>.",
        initialCode: `logged_in = false\n`,
        hint: "unless logged_in\n  puts 'Please Login'\nend",
        solution: "logged_in = false\nunless logged_in\n  puts 'Please Login'\nend",
        validate: (out) => out.includes("Please Login"),
        quiz: {
          question: "An <code>unless</code> block runs if its condition evaluates to...",
          options: ["true", "false", "nil", "an error"],
          correct: 1,
          rationale: "<code>unless</code> evaluates to the opposite of `if` - it executes code only if the condition is false/nil."
        }
      },
      {
        stepNumber: 29,
        level: "Core Practice",
        title: "29. Ternary Operator",
        prompt: "Given <code>score = 85</code>, print <code>'Pass'</code> if score >= 60, else print <code>'Fail'</code> using a single-line ternary conditional operator (<code>? :</code>).",
        initialCode: `score = 85\n`,
        hint: "puts score >= 60 ? 'Pass' : 'Fail'",
        solution: "score = 85\nputs score >= 60 ? 'Pass' : 'Fail'",
        validate: (out) => out.includes("Pass"),
        quiz: {
          question: "Which expression represents the ternary syntax in Ruby?",
          options: ["cond ? yes : no", "cond if yes else no", "cond -> yes || no", "cond ? yes | no"],
          correct: 0,
          rationale: "The ternary operator uses the <code>? :</code> format: <code>condition ? if_true : if_false</code>."
        }
      },
      {
        stepNumber: 30,
        level: "Core Practice",
        title: "30. Multi-Branching with elsif",
        prompt: "Given <code>temp = 15</code>. Print <code>'Hot'</code> if temp > 30, <code>'Warm'</code> if temp >= 15, else <code>'Cold'</code>.",
        initialCode: `temp = 15\n`,
        hint: "if temp > 30\n  puts 'Hot'\nelsif temp >= 15\n  puts 'Warm'\nelse\n  puts 'Cold'\nend",
        solution: "temp = 15\nif temp > 30\n  puts 'Hot'\nelsif temp >= 15\n  puts 'Warm'\nelse\n  puts 'Cold'\nend",
        validate: (out) => out.includes("Warm"),
        quiz: {
          question: "What is the correct spelling of the multiple-branching keyword in Ruby?",
          options: ["else if", "elseif", "elsif", "elif"],
          correct: 2,
          rationale: "Ruby uses the specifically contracted keyword <code>elsif</code>."
        }
      },
      {
        stepNumber: 31,
        level: "Challenge",
        title: "31. Case / When Switching",
        prompt: "Given <code>code = 'FR'</code>, print <code>'French'</code> if code is 'FR', <code>'Spanish'</code> if code is 'ES', else <code>'Unknown'</code> using <code>case/when</code>.",
        initialCode: `code = "FR"\n`,
        hint: "case code\nwhen 'FR' then puts 'French'\nwhen 'ES' then puts 'Spanish'\nelse puts 'Unknown'\nend",
        solution: "code = 'FR'\ncase code\nwhen 'FR'\n  puts 'French'\nwhen 'ES'\n  puts 'Spanish'\nelse\n  puts 'Unknown'\nend",
        validate: (out) => out.includes("French"),
        quiz: {
          question: "Which keywords initiate a switch-like multi-value matching block in Ruby?",
          options: ["switch / case", "case / when", "choose / check", "match / pattern"],
          correct: 1,
          rationale: "Ruby uses <code>case</code> followed by multiple <code>when</code> blocks to match expressions."
        }
      }
    ]
  },
  {
    id: 7,
    title: "Methods & Functions",
    duration: "25 min",
    theory: `
      <p>Methods in Ruby are defined with <code>def</code> and return the evaluation of their final line implicitly.</p>
    `,
    exercises: [
      {
        stepNumber: 32,
        level: "Warm-Up",
        title: "32. Defining a Greet Method",
        prompt: "Define a method <code>greet(name)</code> that returns <code>'Hello, name'</code>. Call it with <code>'Alice'</code> and print the output.",
        initialCode: `# Define greet method:\n`,
        hint: "def greet(name)\n  \"Hello, #{name}\"\nend\nputs greet('Alice')",
        solution: "def greet(name)\n  \"Hello, #{name}\"\nend\nputs greet('Alice')",
        validate: (out) => out.includes("Hello, Alice"),
        quiz: {
          question: "What keyword defines a method in Ruby?",
          options: ["function", "def", "method", "fn"],
          correct: 1,
          rationale: "Methods are defined using the <code>def</code> keyword."
        }
      },
      {
        stepNumber: 33,
        level: "Core Practice",
        title: "33. Default Parameters",
        prompt: "Define a method <code>price_with_tax(price, tax = 0.1)</code> that returns <code>price * (1 + tax)</code>. Print the result of <code>price_with_tax(100)</code>.",
        initialCode: `# Define method:\n`,
        hint: "def price_with_tax(price, tax = 0.1)\n  price * (1 + tax)\nend\nputs price_with_tax(100)",
        solution: "def price_with_tax(price, tax = 0.1)\n  price * (1 + tax)\nend\nputs price_with_tax(100)",
        validate: (out) => out.includes("110"),
        quiz: {
          question: "How do you specify default argument values in method parameters?",
          options: ["def m(val: 10)", "def m(val = 10)", "def m(val || 10)", "def m(default val = 10)"],
          correct: 1,
          rationale: "Default parameters use the assignment sign (<code>val = default_value</code>) inside method definitions."
        }
      },
      {
        stepNumber: 34,
        level: "Core Practice",
        title: "34. Predicate Methods",
        prompt: "Define a predicate method <code>even?(number)</code> returning boolean if number is divisible by 2. Print result of <code>even?(4)</code>.",
        initialCode: `# Define even? predicate:\n`,
        hint: "def even?(n)\n  n % 2 == 0\nend\nputs even?(4)",
        solution: "def even?(number)\n  number % 2 == 0\nend\nputs even?(4)",
        validate: (out) => out.includes("true"),
        quiz: {
          question: "What suffix character is conventionally used to denote methods that return a boolean value?",
          options: ["!", "?", "$", "@"],
          correct: 1,
          rationale: "Methods returning boolean values (predicates) conventionally end with a question mark (e.g. <code>empty?</code>)."
        }
      },
      {
        stepNumber: 35,
        level: "Core Practice",
        title: "35. Mutating Bang Methods (!)",
        prompt: "Given <code>str = 'gems'</code>, use the bang method <code>str.upcase!</code> to mutate it in-place and print <code>str</code>.",
        initialCode: `str = "gems"\n`,
        hint: "str.upcase!\nputs str",
        solution: "str = \"gems\"\nstr.upcase!\nputs str",
        validate: (out) => out.includes("GEMS"),
        quiz: {
          question: "What suffix character denotes mutating methods that modify their receiver in-place?",
          options: ["?", "$", "!", "*"],
          correct: 2,
          rationale: "Methods ending with an exclamation mark (<code>!</code> or bang) modify the object itself rather than returning a copy."
        }
      },
      {
        stepNumber: 36,
        level: "Challenge",
        title: "36. Splat Arguments (*nums)",
        prompt: "Define a method <code>sum_all(*nums)</code> that captures variable arguments and returns their sum. Print <code>sum_all(1, 2, 3, 4)</code>.",
        initialCode: `# Define sum_all using splat:\n`,
        hint: "def sum_all(*nums)\n  nums.sum\nend\nputs sum_all(1, 2, 3, 4)",
        solution: "def sum_all(*nums)\n  nums.reduce(0) { |sum, n| sum + n }\nend\nputs sum_all(1, 2, 3, 4)",
        validate: (out) => out.includes("10"),
        quiz: {
          question: "What operator is used to capture a variable number of arguments as an array?",
          options: ["&", "* (splat)", "**", "..."],
          correct: 1,
          rationale: "The asterisk (<code>*</code>), known as the splat operator, bundles multiple arguments into an array."
        }
      },
      {
        stepNumber: 37,
        level: "Mini-Project",
        title: "37. Mini-Project: Rot13 Cipher",
        prompt: `Build a method <code>rot13(string)</code> that shifts alphabet letters by 13 spaces (ROT13 cipher encryption).
          <br/><br/>
          <strong>Rules:</strong>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Shift lowercase characters (<code>'a'..'z'</code>) wrapping back if they overflow.</li>
            <li>Shift uppercase characters (<code>'A'..'Z'</code>) wrapping back if they overflow.</li>
            <li>Leave non-alphabetic characters (spaces, punctuation) unmodified.</li>
          </ul>`,
        initialCode: `def rot13(string)
  # Iterate and shift characters:
end`,
        hint: `char.ord - 'a'.ord + 13`,
        solution: `def rot13(string)
  string.chars.map do |char|
    case char
    when 'a'..'z'
      ((char.ord - 'a'.ord + 13) % 26 + 'a'.ord).chr
    when 'A'..'Z'
      ((char.ord - 'A'.ord + 13) % 26 + 'A'.ord).chr
    else
      char
    end
  end.join
end`,
        validate: (out, code) => {
          try {
            const r = window.rubyVM.eval("rot13('hello') == 'uryyb' && rot13('Uryyb') == 'Hello'").toString();
            return r === "true";
          } catch(e) {
            return false;
          }
        },
        quiz: {
          question: "What does the combination of chars, map, and join do to a string in Ruby?",
          options: ["Validates email addresses", "Transforms the string character by character and returns a new combined string", "Deletes uppercase characters", "Prints it to console"],
          correct: 1,
          rationale: "<code>string.chars</code> breaks it to char array, <code>map</code> shifts them, and <code>join</code> re-assembles the array back to string."
        }
      }
    ]
  },
  {
    id: 8,
    title: "Refactoring Ruby Code",
    duration: "20 min",
    theory: `
      <p>Ruby provides unique syntactic shortcuts like Guard Clauses, Safe Navigation, and Conditional Assignment.</p>
    `,
    exercises: [
      {
        stepNumber: 38,
        level: "Warm-Up",
        title: "38. Guard Clause Refactoring",
        prompt: "Write a method <code>check_age(age)</code> that returns <code>'Allowed'</code>. Add a guard clause <code>return 'Restricted' if age < 18</code>. Print <code>check_age(16)</code>.",
        initialCode: `# Write check_age with guard clause:\n`,
        hint: "def check_age(age)\n  return 'Restricted' if age < 18\n  'Allowed'\nend\nputs check_age(16)",
        solution: "def check_age(age)\n  return 'Restricted' if age < 18\n  'Allowed'\nend\nputs check_age(16)",
        validate: (out) => out.includes("Restricted"),
        quiz: {
          question: "What is a guard clause?",
          options: ["A loop safety trigger", "An early return statement at the start of a method", "A parameter whitelist filter", "An exception recovery block"],
          correct: 1,
          rationale: "A guard clause uses an early return statement to exit the method immediately if a prerequisite condition is not met."
        }
      },
      {
        stepNumber: 39,
        level: "Core Practice",
        title: "39. Conditional Assignment ||=",
        prompt: "Initialize <code>cached_val = nil</code>, then use conditional assignment <code>||=</code> to set it to <code>'Loaded'</code> if nil. Print <code>cached_val</code>.",
        initialCode: `cached_val = nil\n`,
        hint: "cached_val ||= 'Loaded'\nputs cached_val",
        solution: "cached_val = nil\ncached_val ||= 'Loaded'\nputs cached_val",
        validate: (out) => out.includes("Loaded"),
        quiz: {
          question: "What does conditional assignment <code>x ||= y</code> do?",
          options: ["Assigns y to x only if x is nil or false", "Always assigns y to x", "Performs logic OR comparison", "Crashes if x is nil"],
          correct: 0,
          rationale: "The conditional assignment operator assigns the right value only if the left-side variable is falsy (nil or false)."
        }
      },
      {
        stepNumber: 40,
        level: "Core Practice",
        title: "40. One-line Method Definition",
        prompt: "Define a method <code>square(x) = x * x</code> in a single line. Print the result of <code>square(9)</code>.",
        initialCode: `# Square method in one line:\n`,
        hint: "def square(x) = x * x\nputs square(9)",
        solution: "def square(x) = x * x\nputs square(9)",
        validate: (out) => out.includes("81"),
        quiz: {
          question: "Which symbol defines a single-line shorthand method definition body?",
          options: ["=", "=>", "->", ":"],
          correct: 0,
          rationale: "In modern Ruby, you can declare single-line methods using: <code>def name(args) = expression</code>."
        }
      },
      {
        stepNumber: 41,
        level: "Core Practice",
        title: "41. Safe Navigation Operator (&.)",
        prompt: "Given <code>user = nil</code>, print the result of calling <code>user&.name</code> (should print nil/empty instead of crashing).",
        initialCode: `user = nil\n`,
        hint: "puts user&.name",
        solution: "user = nil\nputs user&.name",
        validate: (out) => !out.includes("Error"),
        quiz: {
          question: "Which operator represents the safe navigation operator in Ruby?",
          options: ["&.", "?.", "??", "||="],
          correct: 0,
          rationale: "The safe navigation operator <code>&.</code> prevents <code>NoMethodError</code> by returning nil if the receiver object is nil."
        }
      },
      {
        stepNumber: 42,
        level: "Challenge",
        title: "42. Symbol to Proc Shortcut",
        prompt: "Given array <code>words = ['ruby', 'rails']</code>, use <code>words.map(&:upcase)</code> to capitalize them, and print the array.",
        initialCode: `words = ["ruby", "rails"]\n`,
        hint: "puts words.map(&:upcase)",
        solution: 'words = ["ruby", "rails"]\nputs words.map(&:upcase)',
        validate: (out) => out.includes("RUBY") && out.includes("RAILS"),
        quiz: {
          question: "What is the equivalent block syntax of <code>words.map(&:upcase)</code>?",
          options: ["words.map { |w| w.upcase }", "words.map { upcase }", "words.map(upcase)", "words.map { |w| upcase(w) }"],
          correct: 0,
          rationale: "The symbol-to-proc shortcut <code>&:method_name</code> is a shorthand wrapper to call that method on each block element."
        }
      }
    ]
  },
  {
    id: 9,
    title: "Loops & Blocks in Ruby",
    duration: "30 min",
    theory: `
      <p>Iterators process collections concisely using blocks wrapped in <code>do ... end</code> or brackets <code>{ ... }</code>.</p>
    `,
    exercises: [
      {
        stepNumber: 43,
        level: "Warm-Up",
        title: "43. The .times Iterator",
        prompt: "Use <code>3.times</code> loop to print <code>'Ruby'</code> 3 times.",
        initialCode: `# Use 3.times loop:\n`,
        hint: "3.times { puts 'Ruby' }",
        solution: '3.times do\n  puts "Ruby"\nend',
        validate: (out) => (out.match(/Ruby/g) || []).length >= 3,
        quiz: {
          question: "How many times does <code>5.times</code> evaluate its block?",
          options: ["4", "5", "6", "infinite"],
          correct: 1,
          rationale: "The <code>.times</code> method on numbers evaluates its attached block exactly that number of times."
        }
      },
      {
        stepNumber: 44,
        level: "Core Practice",
        title: "44. Transforming with .map",
        prompt: "Use <code>.map</code> on <code>[1, 2, 3]</code> to double each value and print the mapped array.",
        initialCode: `nums = [1, 2, 3]\n`,
        hint: "doubled = nums.map { |n| n * 2 }\nputs doubled",
        solution: "nums = [1, 2, 3]\ndoubled = nums.map { |n| n * 2 }\nputs doubled",
        validate: (out) => out.includes("2") && out.includes("6"),
        quiz: {
          question: "Which iterator method returns a new array with the values returned by the block?",
          options: [".each", ".map", ".select", ".reduce"],
          correct: 1,
          rationale: "<code>.map</code> transforms each element and returns a new collection containing the block results."
        }
      },
      {
        stepNumber: 45,
        level: "Core Practice",
        title: "45. Filtering with .select",
        prompt: "Use <code>.select</code> on <code>[1, 2, 3, 4, 5, 6]</code> to pick even numbers and print them.",
        initialCode: `numbers = [1, 2, 3, 4, 5, 6]\n`,
        hint: "evens = numbers.select { |n| n % 2 == 0 }\nputs evens",
        solution: "numbers = [1, 2, 3, 4, 5, 6]\nevens = numbers.select { |n| n % 2 == 0 }\nputs evens",
        validate: (out) => out.includes("2") && out.includes("4") && out.includes("6"),
        quiz: {
          question: "Which method filters a collection and returns elements that match a truthy condition?",
          options: [".select", ".map", ".find", ".reject"],
          correct: 0,
          rationale: "<code>.select</code> filters an array, returning a new collection of all elements for which the block evaluates to true."
        }
      },
      {
        stepNumber: 46,
        level: "Core Practice",
        title: "46. Accumulating with .reduce",
        prompt: "Sum array <code>vals = [10, 20, 30]</code> using <code>.reduce(0)</code> and print the total.",
        initialCode: `vals = [10, 20, 30]\n`,
        hint: "puts vals.reduce(0) { |sum, n| sum + n }",
        solution: "vals = [10, 20, 30]\nputs vals.reduce(0) { |sum, n| sum + n }",
        validate: (out) => out.includes("60"),
        quiz: {
          question: "What is the synonym method for <code>.reduce</code> in Ruby arrays?",
          options: [".inject", ".accumulate", ".sum", ".map_sum"],
          correct: 0,
          rationale: "<code>.reduce</code> and <code>.inject</code> are completely identical methods in Ruby."
        }
      },
      {
        stepNumber: 47,
        level: "Challenge",
        title: "47. Each with Index",
        prompt: "Given <code>fruits = ['Apple', 'Banana']</code>, use <code>.each_with_index</code> to output each item formatted as <code>'Fruit: Apple, Index: 0'</code>.",
        initialCode: `fruits = ["Apple", "Banana"]\n`,
        hint: 'fruits.each_with_index { |f, i| puts "Fruit: #{f}, Index: #{i}" }',
        solution: 'fruits = ["Apple", "Banana"]\nfruits.each_with_index { |f, i| puts "Fruit: #{f}, Index: #{i}" }',
        validate: (out) => out.includes("Fruit: Apple, Index: 0") && out.includes("Fruit: Banana, Index: 1"),
        quiz: {
          question: "What arguments are yielded to a block when executing <code>each_with_index</code>?",
          options: ["Only the element", "The index, then the element", "The element, then the index", "The array itself"],
          correct: 2,
          rationale: "<code>each_with_index</code> yields two arguments to its block: <code>|element, index|</code>."
        }
      }
    ]
  },
  {
    id: 10,
    title: "Object-Oriented Programming (OOP)",
    duration: "35 min",
    theory: `
      <p>Ruby is a pure OOP language. Classes encapsulate state (instance variables prefixed by <code>@</code>) and behavior (methods).</p>
    `,
    exercises: [
      {
        stepNumber: 48,
        level: "Warm-Up",
        title: "48. Defining a Class",
        prompt: "Define a class named <code>Book</code> with an empty body, then print its class using <code>puts Book</code>.",
        initialCode: `# Define Book class:\n`,
        hint: "class Book\nend\nputs Book",
        solution: "class Book\nend\nputs Book",
        validate: (out) => out.includes("Book"),
        quiz: {
          question: "What keyword is used to declare a class in Ruby?",
          options: ["class", "Class", "new_class", "module"],
          correct: 0,
          rationale: "Classes are defined with the lowercase keyword <code>class</code> followed by a capitalized constant name."
        }
      },
      {
        stepNumber: 49,
        level: "Core Practice",
        title: "49. Instance Variables",
        prompt: "Create a class <code>User</code> with an <code>initialize(name)</code> constructor setting <code>@name</code>. Provide getter method <code>name</code>. Instantiate <code>User.new('Alice')</code> and print its name.",
        initialCode: `# Define User with constructor:\n`,
        hint: "class User\n  def initialize(name)\n    @name = name\n  end\n  def name\n    @name\n  end\nend\nu = User.new('Alice')\nputs u.name",
        solution: "class User\n  def initialize(name)\n    @name = name\n  end\n  def name\n    @name\n  end\nend\nu = User.new('Alice')\nputs u.name",
        validate: (out) => out.includes("Alice"),
        quiz: {
          question: "What prefix symbol is used to declare instance variables representing the state of an object?",
          options: ["$", "@", "@@", "None of the options"],
          correct: 1,
          rationale: "Instance variables are prefixed with a single at-sign (<code>@</code>), keeping them scoped to that specific object instance."
        }
      },
      {
        stepNumber: 50,
        level: "Core Practice",
        title: "50. Attribute Accessors",
        prompt: "Use <code>attr_accessor :title</code> inside a <code>Book</code> class. Instantiate it, set its title to <code>'Ruby'</code>, and print it.",
        initialCode: `class Book\n  # Add attr_accessor here\nend\n`,
        hint: "class Book\n  attr_accessor :title\nend\nb = Book.new\nb.title = 'Ruby'\nputs b.title",
        solution: "class Book\n  attr_accessor :title\nend\nb = Book.new\nb.title = 'Ruby'\nputs b.title",
        validate: (out) => out.includes("Ruby"),
        quiz: {
          question: "What helper macros generate BOTH getter and setter methods for an attribute in a class?",
          options: ["attr_reader", "attr_writer", "attr_accessor", "attribute"],
          correct: 2,
          rationale: "<code>attr_accessor</code> automatically builds both reading and writing accessor methods."
        }
      },
      {
        stepNumber: 51,
        level: "Core Practice",
        title: "51. Instance Methods",
        prompt: "Define an instance method <code>describe</code> inside <code>Dog</code> class returning <code>'Woof!'</code>. Create an instance and print the descriptor output.",
        initialCode: `class Dog\n  # Add describe:\nend\n`,
        hint: "class Dog\n  def describe\n    'Woof!'\n  end\nend\nd = Dog.new\nputs d.describe",
        solution: "class Dog\n  def describe\n    'Woof!'\n  end\nend\nd = Dog.new\nputs d.describe",
        validate: (out) => out.includes("Woof!"),
        quiz: {
          question: "How do you call an instance method named <code>bark</code> on class <code>Dog</code>?",
          options: ["Dog.bark", "Dog.new.bark", "Dog::bark", "bark(Dog)"],
          correct: 1,
          rationale: "Instance methods require creating an instance of the class (using <code>Dog.new</code>) before invoking them."
        }
      },
      {
        stepNumber: 52,
        level: "Challenge",
        title: "52. Class Inheritance",
        prompt: "Inherit <code>Cat</code> from <code>Animal</code> (which has method <code>speak</code> returning <code>'Hello'</code>). Override <code>speak</code> in <code>Cat</code> to return <code>'Meow'</code>, instantiate it, and print its voice.",
        initialCode: `class Animal\n  def speak\n    "Hello"\n  end\nend\n\n# Inherit Cat:\n`,
        hint: "class Cat < Animal\n  def speak\n    'Meow'\n  end\nend\nc = Cat.new\nputs c.speak",
        solution: 'class Animal\n  def speak\n    "Hello"\n  end\nend\nclass Cat < Animal\n  def speak\n    "Meow"\n  end\nend\nc = Cat.new\nputs c.speak',
        validate: (out) => out.includes("Meow"),
        quiz: {
          question: "What operator denotes class inheritance in Ruby?",
          options: ["<", "<<", ":", "extends"],
          correct: 0,
          rationale: "Ruby uses the less-than operator (<code>&lt;</code>) to specify that a subclass inherits from a parent superclass."
        }
      },
      {
        stepNumber: 53,
        level: "Core Practice",
        title: "53. Private Access Control",
        prompt: "Create class <code>Secret</code> with a private method <code>key</code> returning <code>'123'</code>. Call it from a public method <code>reveal</code> and print the result of <code>Secret.new.reveal</code>.",
        initialCode: `class Secret
  def reveal
    key
  end
  # Write private keyword and key method below:
end
puts Secret.new.reveal`,
        hint: `private\ndef key; '123'; end`,
        solution: `class Secret
  def reveal
    key
  end
  private
  def key
    '123'
  end
end
puts Secret.new.reveal`,
        validate: (out) => out.includes('123'),
        quiz: {
          question: "Which access modifier restricts method calls to only within the same class context, hiding it from external objects?",
          options: ['public', 'private', 'protected', 'hidden'],
          correct: 1,
          rationale: "Methods declared under the <code>private</code> keyword cannot be invoked with an explicit receiver, even if it is <code>self</code>."
        }
      },
      {
        stepNumber: 54,
        level: "Core Practice",
        title: "54. Protected Access Control",
        prompt: "Declare a protected method <code>secret_id</code> returning <code>'ID99'</code> in class <code>User</code>. Compare it inside public method <code>compare(other)</code> and print the result of <code>u1.compare(u2)</code>.",
        initialCode: `class User
  def compare(other)
    secret_id == other.secret_id
  end
  # Write protected secret_id method:
end`,
        hint: `protected\ndef secret_id; 'ID99'; end`,
        solution: `class User
  def compare(other)
    secret_id == other.secret_id
  end
  protected
  def secret_id
    'ID99'
  end
end
u1 = User.new
u2 = User.new
puts u1.compare(u2)`,
        validate: (out) => out.includes('true'),
        quiz: {
          question: "How do <code>protected</code> methods differ from <code>private</code> methods?",
          options: ['Protected methods cannot be inherited', 'Protected methods can be called with an explicit receiver if that receiver is of the same class family type', 'Protected methods are globally public', 'None of the options'],
          correct: 1,
          rationale: "Unlike private methods, a protected method can be called on another instance as long as both belong to the same class hierarchy."
        }
      },
      {
        stepNumber: 55,
        level: "Core Practice",
        title: "55. Class Constants",
        prompt: "Declare a constant named <code>VERSION = '2.1'</code> inside class <code>App</code>. Print it using the constant resolution operator <code>::</code>.",
        initialCode: `class App
  # Declare VERSION constant:
end
# Print constant:
`,
        hint: `VERSION = '2.1'\nputs App::VERSION`,
        solution: `class App
  VERSION = '2.1'
end
puts App::VERSION`,
        validate: (out) => out.includes('2.1'),
        quiz: {
          question: "Which operator is used to resolve constants nested inside modules or classes?",
          options: ['.', '::', '->', '@'],
          correct: 1,
          rationale: "The namespace resolution operator <code>::</code> accesses constants nested inside classes or modules (e.g. <code>Math::PI</code>)."
        }
      },
      {
        stepNumber: 56,
        level: "Challenge",
        title: "56. Custom Exceptions",
        prompt: "Inherit class <code>PaymentError</code> from <code>StandardError</code>. Write a method <code>charge</code> that raises it with message <code>'Failed'</code>. Rescue it and print the message.",
        initialCode: `# Define custom exception PaymentError:

begin
  # raise error
rescue PaymentError => e
  puts e.message
end`,
        hint: `class PaymentError < StandardError; end\nraise PaymentError, 'Failed'`,
        solution: `class PaymentError < StandardError; end
def charge
  raise PaymentError, 'Failed'
end
begin
  charge
rescue PaymentError => e
  puts e.message
end`,
        validate: (out) => out.includes('Failed'),
        quiz: {
          question: "What core exception class should your custom domain exception classes inherit from by convention?",
          options: ['Exception', 'StandardError', 'RuntimeError', 'Class'],
          correct: 1,
          rationale: "Inheriting from <code>StandardError</code> ensures that your custom exceptions are caught by default <code>rescue</code> blocks, unlike <code>Exception</code> which catches system level panics."
        }
      },
      {
        stepNumber: 57,
        level: "Mini-Project",
        title: "57. Mini-Project: Bank Account Tracker",
        prompt: `Build a class <code>BankAccount</code> to manage user balances.
          <br/><br/>
          <strong>Requirements:</strong>
          <ul class="list-decimal pl-5 mt-2 space-y-1">
            <li>Initialize with <code>owner</code> and <code>balance</code> (set variables <code>@owner</code> and <code>@balance</code>).</li>
            <li>Expose getter <code>owner</code> and getter/setter <code>balance</code>.</li>
            <li>Define method <code>deposit(amount)</code> that adds value and returns updated balance.</li>
            <li>Define method <code>withdraw(amount)</code> that subtracts value if funds are sufficient, otherwise raises a <code>StandardError</code> with message <code>'Insufficient funds'</code>.</li>
          </ul>`,
        initialCode: `class BankAccount
  # Implement class:
end`,
        hint: `raise StandardError, 'Insufficient funds' if amount > @balance`,
        solution: `class BankAccount
  attr_reader :owner
  attr_accessor :balance
  def initialize(owner, balance)
    @owner = owner
    @balance = balance
  end
  def deposit(amount)
    @balance += amount
  end
  def withdraw(amount)
    raise StandardError, 'Insufficient funds' if amount > @balance
    @balance -= amount
  end
end`,
        validate: (out, code) => {
          try {
            const r = window.rubyVM.eval("b = BankAccount.new('Alice', 100); b.deposit(50); b.withdraw(30); b.balance == 120 rescue false").toString();
            return r === "true";
          } catch(e) {
            return false;
          }
        },
        quiz: {
          question: "Which macro defines both getter and setter methods in Ruby classes?",
          options: ["attr_reader", "attr_writer", "attr_accessor", "attribute"],
          correct: 2,
          rationale: "<code>attr_accessor</code> creates both getter (read) and setter (write) instance variable helpers automatically."
        }
      }
  },
  {
    id: 11,
    title: "Advanced OOP & Procs",
    duration: "30 min",
    theory: `
      <p>Ruby supports code reuse via **Modules/Mixins** (since it doesn't support multiple inheritance). Furthermore, blocks can be saved as objects using **Procs** and **Lambdas**.</p>
    `,
    exercises: [
      {
        stepNumber: 58,
        level: "Warm-Up",
        title: "58. Modules and Mixins",
        prompt: "Define a module <code>Flyable</code> containing method <code>fly</code> returning <code>'Flying'</code>. Mix it into class <code>Bird</code> using <code>include</code>. Create a Bird instance and print its fly output.",
        initialCode: `# Define module and Bird class:\n`,
        hint: "module Flyable\n  def fly; 'Flying'; end\nend\nclass Bird\n  include Flyable\nend\nputs Bird.new.fly",
        solution: "module Flyable\n  def fly; 'Flying'; end\nend\nclass Bird\n  include Flyable\nend\nputs Bird.new.fly",
        validate: (out) => out.includes("Flying"),
        quiz: {
          question: "What keyword mixes a Module's methods into a class as INSTANCE methods?",
          options: ["include", "extend", "import", "require"],
          correct: 0,
          rationale: "<code>include</code> mixes in methods as instance methods, whereas <code>extend</code> adds them as class methods."
        }
      },
      {
        stepNumber: 59,
        level: "Core Practice",
        title: "59. Blocks vs Procs",
        prompt: "Create a Proc named <code>double_proc</code> using <code>Proc.new { |n| n * 2 }</code>. Print the result of calling it with argument <code>5</code>.",
        initialCode: `# Create and invoke Proc:\n`,
        hint: "double_proc = Proc.new { |n| n * 2 }\nputs double_proc.call(5)",
        solution: "double_proc = Proc.new { |n| n * 2 }\nputs double_proc.call(5)",
        validate: (out) => out.includes("10"),
        quiz: {
          question: "What is a Proc in Ruby?",
          options: ["A process compiler identifier", "An object representing a saved block of code", "A local variable scope gate", "A database query wrapper"],
          correct: 1,
          rationale: "A Proc (procedure) is a block of code bound to a set of local variables, saved as a reusable object."
        }
      },
      {
        stepNumber: 60,
        level: "Core Practice",
        title: "60. Lambdas in Ruby",
        prompt: "Create a lambda named <code>inc_lambda</code> using <code>->(x) { x + 1 }</code>. Print the result of calling it with <code>9</code>.",
        initialCode: `# Create and call lambda:\n`,
        hint: "inc_lambda = ->(x) { x + 1 }\nputs inc_lambda.call(9)",
        solution: "inc_lambda = ->(x) { x + 1 }\nputs inc_lambda.call(9)",
        validate: (out) => out.includes("10"),
        quiz: {
          question: "How do Lambdas differ from regular Procs?",
          options: ["Lambdas crash on math operations", "Lambdas strictly enforce argument counts and handle returns differently", "Lambdas cannot accept parameters", "Lambdas are not object instances"],
          correct: 1,
          rationale: "Lambdas check argument parity (number of inputs) strictly and return control to the calling method rather than exiting the parent scope."
        }
      },
      {
        stepNumber: 61,
        level: "Core Practice",
        title: "61. Closures Scope",
        prompt: "Create a counter Proc using closures. Given constructor method: <code>def counter_gen; val = 0; -> { val += 1 }; end</code>. Call the gen method, invoke the resulting closure twice, and print the second count.",
        initialCode: `def counter_gen\n  val = 0\n  -> { val += 1 }\nend\n# Generate counter and invoke it:\n`,
        hint: "c = counter_gen\nc.call\nputs c.call",
        solution: "def counter_gen\n  val = 0\n  -> { val += 1 }\nend\nc = counter_gen\nc.call\nputs c.call",
        validate: (out) => out.includes("2"),
        quiz: {
          question: "What does a closure capture when defined?",
          options: ["Only global variables", "The local variable bindings from its surrounding context", "Only its own arguments", "Nothing, variables must be repassed"],
          correct: 1,
          rationale: "A closure retains references to the local variables that were in scope when it was originally declared."
        }
      },
      {
        stepNumber: 62,
        level: "Challenge",
        title: "62. Monkey Patching",
        prompt: "Monkey-patch the core class <code>String</code> by defining method <code>shout</code> returning the string in uppercase with <code>'!!!'</code> appended. Print <code>'hello'.shout</code>.",
        initialCode: `class String\n  # Add shout method:\nend\n`,
        hint: "class String\n  def shout\n    self.upcase + '!!!'\n  end\nend\nputs 'hello'.shout",
        solution: "class String\n  def shout\n    self.upcase + '!!!'\n  end\nend\nputs 'hello'.shout",
        validate: (out) => out.includes("HELLO!!!"),
        quiz: {
          question: "What is monkey patching?",
          options: ["Using code analyzers like RuboCop", "Re-opening and modifying existing classes at runtime", "Creating subclasses to inherit behavior", "Throwing runtime exceptions"],
          correct: 1,
          rationale: "Monkey patching refers to dynamically extending or re-defining existing built-in classes at runtime."
        }
      }
    ]
  },
  {
    id: 12,
    title: "Errors, Regex, & Built-ins",
    duration: "25 min",
    theory: `
      <p>Ruby provides a robust exception model (<code>begin/rescue/ensure</code>), built-in Regular Expressions, ranges, and flexible method argument binding operators.</p>
    `,
    exercises: [
      {
        stepNumber: 63,
        level: "Warm-Up",
        title: "63. Exception Handling",
        prompt: "Wrap a division by zero in a <code>begin/rescue ZeroDivisionError => e</code> block. Inside rescue, print the error message (using <code>puts e.message</code>).",
        initialCode: `begin\n  # Cause a division by zero\nrescue ZeroDivisionError => e\n  # print message\nend\n`,
        hint: "begin\n  1 / 0\nrescue ZeroDivisionError => e\n  puts e.message\nend",
        solution: "begin\n  1 / 0\nrescue ZeroDivisionError => e\n  puts e.message\nend",
        validate: (out) => out.toLowerCase().includes("divided by zero"),
        quiz: {
          question: "Which block keyword is guaranteed to execute at the end of a begin/rescue block, regardless of errors?",
          options: ["rescue", "ensure", "finally", "else"],
          correct: 1,
          rationale: "The <code>ensure</code> block always runs after the rescue/begin block finishes, similar to finally in other languages."
        }
      },
      {
        stepNumber: 64,
        level: "Core Practice",
        title: "64. Regex Matching",
        prompt: "Given <code>text = 'ID: 452'</code>, match it against regex <code>/\\d+/</code> using the match operator <code>=~</code> and print the index position of the match.",
        initialCode: `text = "ID: 452"\n`,
        hint: "puts text =~ /\\d+/",
        solution: 'text = "ID: 452"\nputs text =~ /\\d+/',
        validate: (out) => out.includes("4"),
        quiz: {
          question: "What value does the match operator <code>=~</code> return when a regex matches?",
          options: ["True", "The matched substring", "The integer index where the match starts", "Nil"],
          correct: 2,
          rationale: "The pattern match operator <code>=~</code> returns the character index of the first match, or nil if no match is found."
        }
      },
      {
        stepNumber: 65,
        level: "Core Practice",
        title: "65. Date and Time",
        prompt: "Instantiate the current time using <code>Time.now</code> and print only its year attribute.",
        initialCode: `# Print the current year:\n`,
        hint: "puts Time.now.year",
        solution: "puts Time.now.year",
        validate: (out) => out.includes("202"),
        quiz: {
          question: "Which method is used to get the current timestamp in Ruby?",
          options: ["Time.current", "Time.now", "Time.new", "Date.now"],
          correct: 1,
          rationale: "<code>Time.now</code> returns a Time object initialized with the current system clock timestamp."
        }
      },
      {
        stepNumber: 66,
        level: "Core Practice",
        title: "66. Working with Ranges",
        prompt: "Create a range <code>1..5</code> (inclusive), convert it to an array using <code>.to_a</code>, and print it.",
        initialCode: `# Create range and print array:\n`,
        hint: "puts (1..5).to_a",
        solution: "puts (1..5).to_a",
        validate: (out) => out.includes("1") && out.includes("5"),
        quiz: {
          question: "What is the difference between ranges defined with <code>..</code> versus <code>...</code>?",
          options: [".. is inclusive of the end; ... is exclusive", ".. is exclusive; ... is inclusive", ".. represents steps; ... is floats", "None, they are identical"],
          correct: 0,
          rationale: "Two dots (<code>..</code>) create an inclusive range, while three dots (<code>...</code>) exclude the terminal element."
        }
      },
      {
        stepNumber: 67,
        level: "Challenge",
        title: "67. Double Splat (**kwargs)",
        prompt: "Define a method <code>info(**kwargs)</code>. Call it passing <code>age: 25</code> and print the value of key <code>:age</code> inside kwargs.",
        initialCode: `# Define method with double-splat kwargs:\n`,
        hint: "def info(**kwargs)\n  puts kwargs[:age]\nend\ninfo(age: 25)",
        solution: "def info(**kwargs)\n  puts kwargs[:age]\nend\ninfo(age: 25)",
        validate: (out) => out.includes("25"),
        quiz: {
          question: "What does the double splat operator (<code>**</code>) capture in method parameters?",
          options: ["An array of arguments", "Arbitrary keyword/hash arguments", "A code block", "None of the options"],
          correct: 1,
          rationale: "Double splat parameters gather all remaining keyword arguments passed to a method into a single Hash."
        }
      }
    ]
  },
  {
    id: 13,
    title: "Metaprogramming Foundations",
    duration: "30 min",
    theory: `
      <p>Metaprogramming in Ruby allows inspecting objects and defining code dynamically at runtime using <code>send</code>, <code>define_method</code>, and <code>method_missing</code>.</p>
    `,
    exercises: [
      {
        stepNumber: 68,
        level: "Warm-Up",
        title: "68. Dynamic Call (send)",
        prompt: "Call method <code>:reverse</code> on string <code>'ruby'</code> dynamically using <code>.send</code> and print the result.",
        initialCode: `str = "ruby"\n`,
        hint: "puts str.send(:reverse)",
        solution: 'str = "ruby"\nputs str.send(:reverse)',
        validate: (out) => out.includes("ybur"),
        quiz: {
          question: "Why is the <code>send</code> method useful in Ruby metaprogramming?",
          options: ["It performs email transfers", "It invokes a method dynamically by its name symbol/string", "It compiles script files", "It opens network sockets"],
          correct: 1,
          rationale: "<code>.send(method_name)</code> dynamically looks up and invokes the named method on the receiver object."
        }
      },
      {
        stepNumber: 69,
        level: "Core Practice",
        title: "69. Dynamic define_method",
        prompt: "Inside class <code>Greeter</code>, use <code>define_method(:hello) { 'Hi' }</code>. Instantiate and print the result of calling <code>Greeter.new.hello</code>.",
        initialCode: `class Greeter\n  # Define method dynamically:\nend\n`,
        hint: "class Greeter\n  define_method(:hello) { 'Hi' }\nend\nputs Greeter.new.hello",
        solution: "class Greeter\n  define_method(:hello) { 'Hi' }\nend\nputs Greeter.new.hello",
        validate: (out) => out.includes("Hi"),
        quiz: {
          question: "Where is the <code>define_method</code> utility executed?",
          options: ["Inside instance methods", "Directly within class definition contexts", "Globally on Object", "Inside blocks only"],
          correct: 1,
          rationale: "<code>define_method</code> is a class-level helper method that dynamically declares instance methods on that class."
        }
      },
      {
        stepNumber: 70,
        level: "Core Practice",
        title: "70. Method Missing Hook",
        prompt: "Create a class <code>Ghost</code> that overrides <code>method_missing(name, *args)</code> to print <code>'Called: '</code> followed by the method name. Create an instance and call arbitrary method <code>boo</code>.",
        initialCode: `class Ghost\n  # Override method_missing:\nend\n`,
        hint: "class Ghost\n  def method_missing(name, *args)\n    puts \"Called: #{name}\"\n  end\nend\nGhost.new.boo",
        solution: "class Ghost\n  def method_missing(name, *args)\n    puts \"Called: #{name}\"\n  end\nend\nGhost.new.boo",
        validate: (out) => out.includes("Called: boo"),
        quiz: {
          question: "Which hook method is executed by Ruby when a called method does not exist on an object?",
          options: ["method_missing", "respond_to?", "define_method", "const_get"],
          correct: 0,
          rationale: "Ruby calls <code>method_missing</code> when dynamic lookup fails to find a matching method definition."
        }
      },
      {
        stepNumber: 71,
        level: "Core Practice",
        title: "71. Object Introspection",
        prompt: "Retrieve the class of string <code>'hello'</code> and print the boolean result of checking if it is class <code>String</code> using <code>== String</code>.",
        initialCode: `# Print true if class is String:\n`,
        hint: "puts 'hello'.class == String",
        solution: "puts 'hello'.class == String",
        validate: (out) => out.includes("true"),
        quiz: {
          question: "Which method is used to inspect the class type of any object at runtime?",
          options: [".type", ".class", ".kind_of?", ".name"],
          correct: 1,
          rationale: "The <code>.class</code> method returns the class definition to which the receiver object belongs."
        }
      },
      {
        stepNumber: 72,
        level: "Challenge",
        title: "72. Constant Lookup",
        prompt: "Retrieve the class definition of <code>:Array</code> dynamically using <code>Object.const_get(:Array)</code>, and print the output of calling <code>.name</code> on it.",
        initialCode: `# Lookup constant Array dynamically:\n`,
        hint: "puts Object.const_get(:Array).name",
        solution: "puts Object.const_get(:Array).name",
        validate: (out) => out.includes("Array"),
        quiz: {
          question: "Which method retrieves a class or constant reference dynamically from its name string/symbol?",
          options: ["const_get", "constantize", "get_class", "eval"],
          correct: 0,
          rationale: "<code>Object.const_get(name)</code> dynamically looks up and returns the class or constant matching the symbol name."
        }
      },
      {
        stepNumber: 73,
        level: "Capstone Project",
        title: "73. Capstone Project 1: OO Task Manager",
        prompt: `Build a class <code>TaskManager</code> and custom error <code>TaskError</code>.
          <br/><br/>
          <strong>Requirements:</strong>
          <ul class="list-decimal pl-5 space-y-1 mt-2">
            <li>Define exception class <code>TaskError < StandardError</code>.</li>
            <li>Implement <code>initialize</code> setting up an empty array <code>@tasks</code>.</li>
            <li>Implement <code>add_task(title)</code> appending a hash <code>{ title: title, status: :pending }</code>. If title is nil or empty, raise a <code>TaskError</code> with message <code>'Invalid Title'</code>.</li>
            <li>Implement <code>complete_task(index)</code> changing the task at index to <code>:completed</code>.</li>
            <li>Implement <code>all_tasks</code> and <code>completed_tasks</code> returning the filtered results.</li>
          </ul>`,
        initialCode: `# Define TaskError and TaskManager:
class TaskError < StandardError; end

class TaskManager
  def initialize
    # init tasks
  end
end`,
        hint: `def add_task(title)\n  raise TaskError, 'Invalid Title' if title.to_s.strip.empty?\n  @tasks << { title: title, status: :pending }\nend`,
        solution: `class TaskError < StandardError; end
class TaskManager
  def initialize
    @tasks = []
  end
  def add_task(title)
    raise TaskError, 'Invalid Title' if title.nil? || title.to_s.strip.empty?
    @tasks << { title: title, status: :pending }
  end
  def complete_task(index)
    @tasks[index][:status] = :completed if @tasks[index]
  end
  def all_tasks
    @tasks
  end
  def completed_tasks
    @tasks.select { |t| t[:status] == :completed }
  end
end`,
        validate: async (out, code) => {
          const testRunner = `
            RSpec.examples = 0
            RSpec.failures = 0
            describe "TaskManager" do
              it "adds task" do
                tm = TaskManager.new
                tm.add_task("A")
                expect(tm.all_tasks.size).to eq(1)
              end
              it "completes task" do
                tm = TaskManager.new
                tm.add_task("A")
                tm.complete_task(0)
                expect(tm.completed_tasks.size).to eq(1)
              end
              it "raises error" do
                tm = TaskManager.new
                expect { tm.add_task("") }.to raise_error(TaskError) rescue nil
              end
            end
            RSpec.failures
          `;
          try {
            const failures = window.rubyVM.eval(testRunner).toString();
            return failures === "0";
          } catch(e) {
            return false;
          }
        },
        quiz: {
          question: "What does the simulated RSpec output prove when all test assertions pass?",
          options: ["Code contains no syntax errors", "All required behaviors and exceptions are correctly implemented according to specifications", "The database committed successfully", "The code was compiled to JavaScript"],
          correct: 1,
          rationale: "Passing BDD specs verify that the object interfaces behave exactly as required by the specifications sheet."
        }
      }
    ]
  },
  {
    id: 14,
    title: "Rails Foundations & Directory Structure",
    duration: "25 min",
    theory: `
      <p>Ruby on Rails is a web framework built on the **MVC (Model-View-Controller)** pattern. It features structural file conventions for models, views, controllers, migrations, and dependencies.</p>
    `,
    exercises: [
      {
        stepNumber: 74,
        level: "Warm-Up",
        title: "74. MVC Architecture Core",
        prompt: "Review the MVC architecture. In the editor, print a string describing the component that handles incoming HTTP requests and updates views (e.g. print <code>'Controller'</code>).",
        initialCode: `# Print the component name:\n`,
        hint: "puts 'Controller'",
        solution: "puts 'Controller'",
        validate: (out) => out.includes("Controller"),
        quiz: {
          question: "Which folder holds the models, views, and controllers in a standard Rails app directory structure?",
          options: ["config/", "app/", "db/", "public/"],
          correct: 1,
          rationale: "The <code>app/</code> folder contains the core logical components (models, controllers, views, assets, mailers, helpers)."
        }
      },
      {
        stepNumber: 75,
        level: "Core Practice",
        title: "75. Database Directory",
        prompt: "Print the standard folder name where Rails databases, seeds, and migrations are stored (e.g. <code>db</code>).",
        initialCode: `# Print folder name:\n`,
        hint: "puts 'db'",
        solution: "puts 'db'",
        validate: (out) => out.includes("db"),
        quiz: {
          question: "What directory holds migrations, schemas, and seeding scripts in a Rails project?",
          options: ["db/", "config/", "app/", "lib/"],
          correct: 0,
          rationale: "The <code>db/</code> folder manages all files related to configuration, structure, and initialization of the database."
        }
      },
      {
        stepNumber: 76,
        level: "Core Practice",
        title: "76. Rails Generators CLI",
        prompt: "Print the terminal CLI command syntax to generate a model named <code>Post</code> with title string attribute (e.g. <code>'rails generate model Post title:string'</code>).",
        initialCode: `# Print CLI command:\n`,
        hint: "puts 'rails generate model Post title:string'",
        solution: "puts 'rails generate model Post title:string'",
        validate: (out) => out.includes("rails generate model Post title:string"),
        quiz: {
          question: "Which CLI command generates models, scaffolding, or migrations templates in Rails?",
          options: ["rails create", "rails generate", "rails new", "rails make"],
          correct: 1,
          rationale: "<code>rails generate</code> (or shorthand <code>rails g</code>) generates code skeletons for models, controllers, and schemas."
        }
      },
      {
        stepNumber: 77,
        level: "Core Practice",
        title: "77. Rails Environments config",
        prompt: "Print the file path that configures the Development environment variables in a Rails app.",
        initialCode: `# Print configuration path:\n`,
        hint: "puts 'config/environments/development.rb'",
        solution: "puts 'config/environments/development.rb'",
        validate: (out) => out.includes("config/environments/development.rb"),
        quiz: {
          question: "Where are Rails environment configuration files located by default?",
          options: ["config/environments/", "config/settings/", "app/config/", "db/config/"],
          correct: 0,
          rationale: "The folder <code>config/environments/</code> contains separate settings for development, testing, and production."
        }
      },
      {
        stepNumber: 78,
        level: "Challenge",
        title: "78. Gemfile & Bundler",
        prompt: "Print the name of the file where all application package gem dependencies are declared.",
        initialCode: `# Print dependencies file:\n`,
        hint: "puts 'Gemfile'",
        solution: "puts 'Gemfile'",
        validate: (out) => out.includes("Gemfile"),
        quiz: {
          question: "Which file lists the external Ruby gem libraries required by a Rails application?",
          options: ["Gemfile", "package.json", "requirements.txt", "Config.gems"],
          correct: 0,
          rationale: "The <code>Gemfile</code> is parsed by Bundler to resolve, download, and load package gems for your app."
        }
      }
    ]
  },
  {
    id: 15,
    title: "Routing & Controller Basics",
    duration: "30 min",
    theory: `
      <p>Rails Routes map incoming HTTP URLs to specific controller action methods. Restful resources automate this configuration.</p>
    `,
    exercises: [
      {
        stepNumber: 79,
        level: "Warm-Up",
        title: "79. HTTP Request Flow mapping",
        prompt: "Configure a route for the root homepage path. In <code>config/routes.rb</code>, draw a root route pointing to <code>'pages#home'</code>.",
        initialCode: {
          "config/routes.rb": "Rails.application.routes.draw do\n  # Add root route:\nend"
        },
        hint: "root to: 'pages#home'",
        solution: "Rails.application.routes.draw do\n  root to: 'pages#home'\nend",
        validate: async () => {
          const res = window.rubyVM.eval("Rails::Router.routes.any? { |r| r[:path] == '/' && r[:to] == 'pages#home' }").toString();
          return res === "true";
        },
        quiz: {
          question: "Where does an incoming HTTP request go immediately after hitting the Rails router?",
          options: ["Directly to the View", "To the database model", "To the matching Controller action method", "To standard log output"],
          correct: 2,
          rationale: "The router directs URLs to specific methods (actions) inside controller classes."
        }
      },
      {
        stepNumber: 80,
        level: "Core Practice",
        title: "80. RESTful Resources routing",
        prompt: "Configure standard RESTful routes for a model resource named <code>posts</code> in <code>config/routes.rb</code>.",
        initialCode: {
          "config/routes.rb": "Rails.application.routes.draw do\n  # Add resources for posts:\nend"
        },
        hint: "resources :posts",
        solution: "Rails.application.routes.draw do\n  resources :posts\nend",
        validate: async () => {
          const res = window.rubyVM.eval("Rails::Router.routes.any? { |r| r[:path] == '/posts' && r[:to] == 'posts#index' }").toString();
          return res === "true";
        },
        quiz: {
          question: "Which routes method declaration generates the seven default RESTful actions automatically?",
          options: ["resources", "route_to", "map_actions", "get"],
          correct: 0,
          rationale: "Declaring <code>resources :photos</code> automatically sets up routes matching index, show, new, create, edit, update, and destroy actions."
        }
      },
      {
        stepNumber: 81,
        level: "Core Practice",
        title: "81. RESTful resource limitation",
        prompt: "Modify the resources statement for <code>posts</code> in <code>config/routes.rb</code> to limit routes to <code>index</code> and <code>show</code> actions only using <code>only: [:index, :show]</code>.",
        initialCode: {
          "config/routes.rb": "Rails.application.routes.draw do\n  # Add limited resources for posts:\nend"
        },
        hint: "resources :posts, only: [:index, :show]",
        solution: "Rails.application.routes.draw do\n  resources :posts, only: [:index, :show]\nend",
        validate: async () => {
          const hasCreate = window.rubyVM.eval("Rails::Router.routes.any? { |r| r[:to] == 'posts#create' }").toString();
          const hasIndex = window.rubyVM.eval("Rails::Router.routes.any? { |r| r[:to] == 'posts#index' }").toString();
          return hasCreate === "false" && hasIndex === "true";
        },
        quiz: {
          question: "How do you limit a resources statement to generate only specific routes?",
          options: ["using restrict: [...]", "using only: [...]", "using actions: [...]", "using limit: [...]"],
          correct: 1,
          rationale: "The <code>only:</code> option filters resource routing to generate only the specified actions."
        }
      },
      {
        stepNumber: 82,
        level: "Core Practice",
        title: "82. Controller Action return",
        prompt: "Define a simple action method named <code>index</code> inside <code>PostsController</code> that returns the string <code>'Hello Posts!'</code>.",
        initialCode: {
          "app/controllers/posts_controller.rb": "class PostsController < ApplicationController\n  # Define index method:\nend"
        },
        hint: "def index\n  'Hello Posts!'\nend",
        solution: "class PostsController < ApplicationController\n  def index\n    'Hello Posts!'\n  end\nend",
        validate: async () => {
          const res = window.rubyVM.eval("PostsController.new.index").toString();
          return res.includes("Hello Posts!");
        },
        quiz: {
          question: "What is an action method in a Rails controller class?",
          options: ["A private validator helper", "A public method that resolves an HTTP endpoint route", "A model relationship constructor", "An HTML template view file"],
          correct: 1,
          rationale: "Controller actions are public instance methods invoked by the router to process requests."
        }
      },
      {
        stepNumber: 83,
        level: "Challenge",
        title: "83. Custom non-RESTful routing",
        prompt: "Add a custom GET route mapping <code>'/welcome'</code> to <code>'pages#welcome'</code> in <code>config/routes.rb</code>.",
        initialCode: {
          "config/routes.rb": "Rails.application.routes.draw do\n  # Add welcome route:\nend"
        },
        hint: "get '/welcome', to: 'pages#welcome'",
        solution: "Rails.application.routes.draw do\n  get '/welcome', to: 'pages#welcome'\nend",
        validate: async () => {
          const res = window.rubyVM.eval("Rails::Router.routes.any? { |r| r[:path] == '/welcome' && r[:to] == 'pages#welcome' }").toString();
          return res === "true";
        },
        quiz: {
          question: "Which router method is used to configure custom, non-RESTful GET routes?",
          options: ["get", "match", "link", "route"],
          correct: 0,
          rationale: "The <code>get</code> routing DSL method explicitly defines custom GET mappings to controller actions."
        }
      }
    ]
  }
];
