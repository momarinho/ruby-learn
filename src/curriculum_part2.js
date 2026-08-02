// Curriculum Data Part 2: Lessons 16 to 30 (Steps 76 to 150)
const lessonsDataPart2 = [
  {
    id: 16,
    title: "Controller Logic & Parameters",
    duration: "30 min",
    theory: `
      <p>Controllers process requests, fetch databases models, set cookies/session states, and expose parameter wrappers.</p>
    `,
    exercises: [
      {
        stepNumber: 84,
        level: "Warm-Up",
        title: "84. Accessing parameters",
        prompt: "Modify <code>index</code> inside <code>UsersController</code> to return the name parameter (e.g. <code>params[:name]</code>).",
        initialCode: {
          "app/controllers/users_controller.rb": "class UsersController < ApplicationController\n  def index\n    # Return params[:name]:\n  end\nend"
        },
        hint: "params[:name]",
        solution: "class UsersController < ApplicationController\n  def index\n    params[:name]\n  end\nend",
        validate: async () => {
          const res = window.rubyVM.eval("UsersController.new({ name: 'Alice' }).index").toString();
          return res === "Alice";
        },
        quiz: {
          question: "How do controllers access route variables or form parameters in Rails?",
          options: ["Using the request object", "Using the params hash", "Using global variables", "Via instance parameters"],
          correct: 1,
          rationale: "Rails bundles all query parameters, route segments, and POST data into the unified <code>params</code> Hash."
        }
      },
      {
        stepNumber: 85,
        level: "Core Practice",
        title: "85. Strong Parameters definition",
        prompt: "Define a private helper method <code>post_params</code> returning <code>params.require(:post).permit(:title)</code> in <code>PostsController</code>.",
        initialCode: {
          "app/controllers/posts_controller.rb": "class PostsController < ApplicationController\n  # Write private post_params helper method:\nend"
        },
        hint: "private\ndef post_params\n  params.require(:post).permit(:title)\nend",
        solution: "class PostsController < ApplicationController\n  private\n  def post_params\n    params.require(:post).permit(:title)\n  end\nend",
        validate: async () => {
          const testParamsCode = `
            class ParamsMock
              def require(key)
                self
              end
              def permit(*args)
                args
              end
            end
            c = PostsController.new
            c.params = ParamsMock.new
            c.send(:post_params)
          `;
          const res = window.rubyVM.eval(testParamsCode).toString();
          return res.includes("title");
        },
        quiz: {
          question: "Which mechanism in Rails controllers prevents mass-assignment security vulnerabilities by white-listing parameters?",
          options: ["Strong Parameters", "before_action Filters", "Validations", "Sessions"],
          correct: 0,
          rationale: "Strong Parameters require declaring parameters to prevent malicious users from posting arbitrary data attributes into database columns."
        }
      },
      {
        stepNumber: 86,
        level: "Core Practice",
        title: "86. Controller before_action filter",
        prompt: "Register <code>before_action :authenticate</code> callback filter in <code>DashboardController</code>. Implement empty private method <code>authenticate</code>.",
        initialCode: {
          "app/controllers/dashboard_controller.rb": "class DashboardController < ApplicationController\n  # Register filter and define method:\nend"
        },
        hint: "before_action :authenticate\n\nprivate\ndef authenticate; end",
        solution: "class DashboardController < ApplicationController\n  before_action :authenticate\n  \n  private\n  def authenticate\n  end\nend",
        validate: async () => {
          const res = window.rubyVM.eval("DashboardController.before_actions.any? { |a| a[:method] == :authenticate }").toString();
          return res === "true";
        },
        quiz: {
          question: "Which filter hook executes a method BEFORE controller actions run?",
          options: ["before_action", "after_action", "around_action", "skip_action"],
          correct: 0,
          rationale: "The <code>before_action</code> macro registers a callback filter that executes prior to actions running."
        }
      },
      {
        stepNumber: 87,
        level: "Core Practice",
        title: "87. Cookies & Sessions manipulation",
        prompt: "In <code>SessionController</code>, write action <code>create</code> that saves <code>params[:user_id]</code> into the <code>session[:user_id]</code> hash, then returns the session ID value.",
        initialCode: {
          "app/controllers/session_controller.rb": "class SessionController < ApplicationController\n  # Save session cookie inside create action:\nend"
        },
        hint: "def create\n  session[:user_id] = params[:user_id]\n  session[:user_id]\nend",
        solution: "class SessionController < ApplicationController\n  def create\n    @session ||= {}\n    @session[:user_id] = params[:user_id]\n    @session[:user_id]\n  end\n  def session; @session ||= {}; end\nend",
        validate: async () => {
          const res = window.rubyVM.eval("SessionController.new({ user_id: '99' }).create").toString();
          return res === "99";
        },
        quiz: {
          question: "Where does Rails store session data by default?",
          options: ["In local text files", "In encrypted client-side cookies", "In memory only", "In database rows"],
          correct: 1,
          rationale: "Rails defaults to CookieStore, which saves encrypted session attributes in cookies in the user's browser."
        }
      },
      {
        stepNumber: 88,
        level: "Challenge",
        title: "88. Flash Messages notice",
        prompt: "In <code>PostsController</code>, implement <code>create</code> action that sets <code>flash[:notice] = 'Saved'</code> and returns the flash notice string.",
        initialCode: {
          "app/controllers/posts_controller.rb": "class PostsController < ApplicationController\n  # Write create setting flash notice:\nend"
        },
        hint: "def create\n  flash[:notice] = 'Saved'\n  flash[:notice]\nend",
        solution: "class PostsController < ApplicationController\n  def create\n    @flash ||= {}\n    @flash[:notice] = 'Saved'\n    @flash[:notice]\n  end\n  def flash; @flash ||= {}; end\nend",
        validate: async () => {
          const res = window.rubyVM.eval("PostsController.new.create").toString();
          return res === "Saved";
        },
        quiz: {
          question: "How long does a message stored inside the <code>flash</code> controller hash persist?",
          options: ["Indefinitely", "Until the user logs out", "For exactly one request lifecycle", "It clears immediately on page render"],
          correct: 2,
          rationale: "The <code>flash</code> hash stores temporary parameters that persist only until the next HTTP request completes."
        }
      }
    ]
  },
  {
    id: 17,
    title: "Active Record & DB Basics",
    duration: "30 min",
    theory: `
      <p>ActiveRecord connects Ruby models to SQL database tables. Migrations modify database structures reversibly.</p>
    `,
    exercises: [
      {
        stepNumber: 89,
        level: "Warm-Up",
        title: "89. Rails Database Migrations",
        prompt: "Write a migration using <code>ActiveRecord::Migration.create_table :posts</code> that yields a table definition with column <code>t.string :title</code>.",
        initialCode: {
          "db/migrate/create_posts.rb": "class CreatePosts < ActiveRecord::Migration\n  def change\n    # Create posts table with title string:\n  end\nend"
        },
        hint: "ActiveRecord::Migration.create_table :posts do |t|\\n  t.string :title\\nend",
        solution: "class CreatePosts < ActiveRecord::Migration\n  def change\n    ActiveRecord::Migration.create_table :posts do |t|\n      t.string :title\n    end\n  end\nend",
        validate: async () => {
          window.rubyVM.eval("CreatePosts.new.change");
          const res = window.rubyVM.eval("$table_columns.key?('posts') && $table_columns['posts'].include?(:title)").toString();
          return res === "true";
        },
        quiz: {
          question: "What command runs all pending migrations?",
          options: ["rails db:migrate", "rails db:schema", "rails run migrations", "rails db:setup"],
          correct: 0,
          rationale: "The terminal CLI command <code>rails db:migrate</code> executes all unapplied migration files in sequential order."
        }
      },
      {
        stepNumber: 90,
        level: "Core Practice",
        title: "90. Modifying Schemas",
        prompt: "Inside migration <code>AddBodyToPosts</code>, define a <code>change</code> method adding a <code>body</code> text column to table <code>:posts</code> (using <code>$table_columns['posts'] << :body</code>).",
        initialCode: {
          "db/migrate/add_body_to_posts.rb": "class AddBodyToPosts < ActiveRecord::Migration\n  def change\n    # Add :body column to posts:\n  end\nend"
        },
        hint: "$table_columns['posts'] << :body",
        solution: "class AddBodyToPosts < ActiveRecord::Migration\n  def change\n    $table_columns['posts'] << :body\n  end\nend",
        validate: async () => {
          window.rubyVM.eval("AddBodyToPosts.new.change");
          const res = window.rubyVM.eval("$table_columns['posts'].include?(:body)").toString();
          return res === "true";
        },
        quiz: {
          question: "Which ActiveRecord Migration method is standard for configuring reversible schema modifications?",
          options: ["up", "down", "change", "create"],
          correct: 2,
          rationale: "The <code>change</code> method dynamically tracks modifications and automatically generates rollback actions."
        }
      },
      {
        stepNumber: 91,
        level: "Core Practice",
        title: "91. ActiveRecord Model class",
        prompt: "Define a class named <code>Post</code> that inherits from <code>ActiveRecord::Base</code>.",
        initialCode: {
          "app/models/post.rb": "# Define Post model class:\n"
        },
        hint: "class Post < ActiveRecord::Base\\nend",
        solution: "class Post < ActiveRecord::Base\nend",
        validate: async () => {
          const res = window.rubyVM.eval("Post.ancestors.include?(ActiveRecord::Base)").toString();
          return res === "true";
        },
        quiz: {
          question: "What class do all Active Record models inherit from in modern Rails applications?",
          options: ["ActiveRecord::Base", "ApplicationRecord", "ActiveRecord::Model", "ApplicationModel"],
          correct: 1,
          rationale: "In modern Rails (v5+), models inherit from <code>ApplicationRecord</code>, which in turn inherits from <code>ActiveRecord::Base</code>."
        }
      },
      {
        stepNumber: 92,
        level: "Core Practice",
        title: "92. CRUD Create & Read",
        prompt: "Create a new record using <code>Post.create!(title: 'Learning Rails')</code>, then retrieve the title of the first post and print it.",
        initialCode: {
          "app/models/post.rb": "class Post < ActiveRecord::Base\nend\n# Create post, retrieve it and print title:\n"
        },
        hint: "Post.create!(title: 'Learning Rails')\\nputs Post.all.first.title",
        solution: "class Post < ActiveRecord::Base\nend\nPost.create!(title: 'Learning Rails')\nputs Post.all.first.title",
        validate: async (out) => {
          return out.includes("Learning Rails");
        },
        quiz: {
          question: "Which ActiveRecord method creates and immediately saves a record into the database in one call?",
          options: ["new", "create", "save", "build"],
          correct: 1,
          rationale: "While <code>new</code> instantiates a model in memory, <code>create</code> instantiates and saves it to the database table."
        }
      },
      {
        stepNumber: 93,
        level: "Challenge",
        title: "93. Database seeds.rb",
        prompt: "Write a seed script that creates three posts using <code>Post.create!</code> with titles: <code>'p1'</code>, <code>'p2'</code>, and <code>'p3'</code>.",
        initialCode: {
          "db/seeds.rb": "# Seed 3 posts:\n"
        },
        hint: "['p1', 'p2', 'p3'].each { |t| Post.create!(title: t) }",
        solution: "['p1', 'p2', 'p3'].each { |t| Post.create!(title: t) }",
        validate: async () => {
          window.rubyVM.eval("Post.records.clear");
          window.rubyVM.eval("['p1', 'p2', 'p3'].each { |t| Post.create!(title: t) }");
          const count = window.rubyVM.eval("Post.count").toString();
          return count === "3";
        },
        quiz: {
          question: "Where do you define mock records to populate a fresh database in a Rails app?",
          options: ["db/seeds.rb", "config/seeds.yml", "db/migrate/seeds.rb", "Gemfile"],
          correct: 0,
          rationale: "The <code>db/seeds.rb</code> script contains code executed by running <code>rails db:seed</code> to populate initial table rows."
        }
      }
    ]
  },
  {
    id: 18,
    title: "Advanced Queries & Scopes",
    duration: "30 min",
    theory: `
      <p>Queries retrieve and order data. Scopes package queries. includes resolves N+1 performance bottlenecks.</p>
    `,
    exercises: [
      {
        stepNumber: 94,
        level: "Warm-Up",
        title: "94. Filtering with where",
        prompt: "Find posts where status is <code>'draft'</code> using <code>Post.where(status: 'draft')</code>. Print the count of returned draft records.",
        initialCode: {
          "app/models/post.rb": "class Post < ActiveRecord::Base\nend\n# Write where query and print count:\n"
        },
        hint: "Post.create!(status: 'draft')\\nputs Post.where(status: 'draft').count",
        solution: "class Post < ActiveRecord::Base\nend\nPost.create!(status: 'draft')\nputs Post.where(status: 'draft').count",
        validate: async (out) => {
          return out.includes("1");
        },
        quiz: {
          question: "What class type does an ActiveRecord query like <code>.where</code> return?",
          options: ["Array", "ActiveRecord::Relation", "Hash", "String"],
          correct: 1,
          rationale: "Query methods return an <code>ActiveRecord::Relation</code>, which allows chaining multiple query parameters before lazy evaluation."
        }
      },
      {
        stepNumber: 95,
        level: "Core Practice",
        title: "95. Ordering results desc",
        prompt: "Order posts by title descending using <code>Post.order('title desc')</code>. Print titles of ordered posts.",
        initialCode: {
          "app/models/post.rb": "class Post < ActiveRecord::Base\nend\n# Order posts and puts titles:\n"
        },
        hint: "Post.create!(title: 'A')\\nPost.create!(title: 'B')\\nputs Post.order('title desc').map(&:title)",
        solution: "class Post < ActiveRecord::Base\nend\nPost.create!(title: 'A')\nPost.create!(title: 'B')\nPost.order('title desc').each { |p| puts p.title }",
        validate: async (out) => {
          return out.replace(/\s+/g, '').includes("BA");
        },
        quiz: {
          question: "How do you sort ActiveRecord results descending by column <code>price</code>?",
          options: ["Post.sort(price: :desc)", "Post.order('price desc')", "Post.desc(:price)", "Post.filter(:price, :desc)"],
          correct: 1,
          rationale: "<code>.order</code> accepts sorting strings like <code>'price desc'</code> or Hash mappings like <code>price: :desc</code>."
        }
      },
      {
        stepNumber: 96,
        level: "Core Practice",
        title: "96. Custom Model Scopes",
        prompt: "Define a scope named <code>active</code> returning only posts where <code>active: true</code>.",
        initialCode: {
          "app/models/post.rb": "class Post < ActiveRecord::Base\n  # Add active scope here:\nend"
        },
        hint: "scope :active, -> { where(active: true) }",
        solution: "class Post < ActiveRecord::Base\n  scope :active, -> { where(active: true) }\nend",
        validate: async () => {
          const scopeCheck = `
            class Post < ActiveRecord::Base
              scope :active, -> { where(active: true) }
            end
            Post.create!(active: true)
            Post.create!(active: false)
            Post.active.count
          `;
          const res = window.rubyVM.eval(scopeCheck).toString();
          return res === "1";
        },
        quiz: {
          question: "Why are ActiveRecord scopes useful?",
          options: ["They validate forms", "They package common database querying logic into class methods", "They encrypt passwords", "They trigger HTML template compiles"],
          correct: 1,
          rationale: "Scopes define reusable query constraints inside models, making query chains clean and standardized."
        }
      },
      {
        stepNumber: 97,
        level: "Core Practice",
        title: "97. Resolving N+1 query method",
        prompt: "Print the name of the method used to resolve N+1 queries by preloading associated records (e.g. print <code>'includes'</code>).",
        initialCode: `# Print method name:\n`,
        hint: "puts 'includes'",
        solution: "puts 'includes'",
        validate: (out) => out.includes("includes"),
        quiz: {
          question: "Which ActiveRecord method preloads associations to solve N+1 database querying issues?",
          options: ["joins", "includes", "preload_all", "where"],
          correct: 1,
          rationale: "<code>includes</code> tells ActiveRecord to fetch associated records in a single query, avoiding the N+1 database query trap."
        }
      },
      {
        stepNumber: 98,
        level: "Challenge",
        title: "98. Database Aggregations sum",
        prompt: "Given model <code>Product</code>, call <code>Product.sum(:price)</code> to calculate the total cost and print it.",
        initialCode: {
          "app/models/product.rb": "class Product < ActiveRecord::Base\nend\n# Seed records and print sum(:price):\n"
        },
        hint: "Product.create!(price: 10)\\nProduct.create!(price: 20)\\nputs Product.sum(:price)",
        solution: "class Product < ActiveRecord::Base\nend\nProduct.create!(price: 10)\nProduct.create!(price: 20)\nputs Product.sum(:price)",
        validate: async (out) => {
          return out.includes("30");
        },
        quiz: {
          question: "Which method calculates the total sum of numeric values in a column directly via SQL?",
          options: [".total", ".sum", ".count", ".aggregate"],
          correct: 1,
          rationale: "ActiveRecord delegates calculations to SQL by exposing methods like <code>.sum</code>, <code>.average</code>, and <code>.count</code>."
        }
      }
    ]
  },
  {
    id: 19,
    title: "Validations, Callbacks & Associations",
    duration: "30 min",
    theory: `
      <p>Validations block bad records. Callbacks trigger lifecycle scripts. Associations connect database tables.</p>
    `,
    exercises: [
      {
        stepNumber: 99,
        level: "Warm-Up",
        title: "99. Model Validations presence",
        prompt: "Add presence validation <code>validates :title, presence: true</code> to the <code>Post</code> model class.",
        initialCode: {
          "app/models/post.rb": "class Post < ActiveRecord::Base\n  # Add validation:\nend"
        },
        hint: "validates :title, presence: true",
        solution: "class Post < ActiveRecord::Base\n  validates :title, presence: true\nend",
        validate: async () => {
          const res = window.rubyVM.eval("Post.create(title: nil).save").toString();
          return res === "false";
        },
        quiz: {
          question: "When are model validations executed by default?",
          options: ["On application startup", "Before saving records to the database", "When loading views", "Whenever you query records"],
          correct: 1,
          rationale: "Rails triggers validations automatically before attempting to insert or update records in the database."
        }
      },
      {
        stepNumber: 100,
        level: "Core Practice",
        title: "100. Active Record Callbacks hook",
        prompt: "Register <code>before_save :downcase_email</code> callback inside <code>User</code>. Implement private method <code>downcase_email</code> setting <code>self.email = email.downcase</code>.",
        initialCode: {
          "app/models/user.rb": "class User < ActiveRecord::Base\n  # Add callback and private downcase_email method:\nend"
        },
        hint: "before_save :downcase_email\\n\\nprivate\\ndef downcase_email\\n  self.email = email.downcase\\nend",
        solution: "class User < ActiveRecord::Base\n  before_save :downcase_email\n  \n  private\n  def downcase_email\n    self.email = email.downcase\n  end\nend",
        validate: async () => {
          const res = window.rubyVM.eval("u = User.create(email: 'ALICE@EXAMPLE.COM'); u.email").toString();
          return res === "alice@example.com";
        },
        quiz: {
          question: "Which callback runs immediately before an active record gets written to the database?",
          options: ["before_validation", "before_save", "after_commit", "before_create"],
          correct: 1,
          rationale: "<code>before_save</code> triggers before any save action (both inserts and updates) completes."
        }
      },
      {
        stepNumber: 101,
        level: "Core Practice",
        title: "101. One-to-Many Associations",
        prompt: "Connect <code>User</code> and <code>Post</code> models. User <code>has_many :posts</code> and Post <code>belongs_to :user</code>.",
        initialCode: {
          "app/models/user.rb": "class User < ActiveRecord::Base\n  # has_many...\nend",
          "app/models/post.rb": "class Post < ActiveRecord::Base\n  # belongs_to...\nend"
        },
        hint: "User class: has_many :posts\\nPost class: belongs_to :user",
        solution: "class User < ActiveRecord::Base\n  has_many :posts\nend\nclass Post < ActiveRecord::Base\n  belongs_to :user\nend",
        validate: async () => {
          const hasMany = window.rubyVM.eval("User.associations[:posts][:type]").toString();
          const belongsTo = window.rubyVM.eval("Post.associations[:user][:type]").toString();
          return hasMany === "has_many" && belongsTo === "belongs_to";
        },
        quiz: {
          question: "Which model relationship declaration connects an item back to its parent container (storing the foreign key)?",
          options: ["has_many", "belongs_to", "has_one", "belongs_many"],
          correct: 1,
          rationale: "<code>belongs_to</code> specifies that the model holds the foreign key (e.g., user_id) pointing to its associated parent."
        }
      },
      {
        stepNumber: 102,
        level: "Core Practice",
        title: "102. One-to-One Associations",
        prompt: "Set up a one-to-one relationship between <code>User</code> and <code>Profile</code>. User <code>has_one :profile</code>.",
        initialCode: {
          "app/models/user.rb": "class User < ActiveRecord::Base\n  # has_one profile:\nend"
        },
        hint: "has_one :profile",
        solution: "class User < ActiveRecord::Base\n  def self.has_one(name)\n    self.associations[name] = { type: :has_one }\n  end\n  has_one :profile\nend",
        validate: async () => {
          const res = window.rubyVM.eval("User.associations.key?(:profile)").toString();
          return res === "true";
        },
        quiz: {
          question: "In a one-to-one relationship (<code>has_one :profile</code>), which model contains the foreign key column by convention?",
          options: ["The User model", "The Profile model", "Both models", "Neither model"],
          correct: 1,
          rationale: "The model carrying <code>belongs_to</code> (Profile) holds the foreign key (e.g. user_id) referencing the parent (User)."
        }
      },
      {
        stepNumber: 103,
        level: "Challenge",
        title: "103. Many-to-Many through",
        prompt: "Specify many-to-many relationship. Declare <code>has_many :tags, through: :taggings</code> inside the <code>Post</code> model class.",
        initialCode: {
          "app/models/post.rb": "class Post < ActiveRecord::Base\n  # Add has_many tags through taggings:\nend"
        },
        hint: "has_many :tags, through: :taggings",
        solution: "class Post < ActiveRecord::Base\n  def self.has_many(name, options = {})\n    self.associations[name] = options\n  end\n  has_many :tags, through: :taggings\nend",
        validate: async () => {
          const res = window.rubyVM.eval("Post.associations[:tags][:through]").toString();
          return res === "taggings";
        },
        quiz: {
          question: "What keyword specifies a many-to-many relationship using a third join table model?",
          options: ["through", "via", "source", "join"],
          correct: 0,
          rationale: "The <code>through:</code> parameter links the association to a join model representing the connection."
        }
      }
    ]
  },
  {
    id: 20,
    title: "Action Views & ERB Templates",
    duration: "30 min",
    theory: `
      <p>Embedded Ruby (ERB) compiles HTML. Layouts hold common shells. Partials divide page components.</p>
    `,
    exercises: [
      {
        stepNumber: 104,
        level: "Warm-Up",
        title: "104. HTML ERB Iterator rendering",
        prompt: "Inside <code>app/views/posts/index.html.erb</code>, loop through <code>@posts</code> and output <code>p.title</code> inside a paragraph tag <code>&lt;p&gt;&lt;%= p.title %&gt;&lt;/p&gt;</code>.",
        initialCode: {
          "app/views/posts/index.html.erb": "<% @posts.each do |p| %>\n  # Output paragraph here:\n<% end %>"
        },
        hint: "<p><%= p.title %></p>",
        solution: "<% @posts.each do |p| %>\n  <p><%= p.title %></p>\n<% end %>",
        validate: async () => {
          const testCode = `
            class PostMock
              attr_accessor :title
              def initialize(t); @title = t; end
            end
            @posts = [PostMock.new('Ruby'), PostMock.new('Rails')]
            ERB.new($templates['posts/index']).result(binding)
          `;
          const res = window.rubyVM.eval(testCode).toString();
          return res.includes("<p>Ruby</p>") && res.includes("<p>Rails</p>");
        },
        quiz: {
          question: "Which ERB syntax tag evaluates Ruby expressions and OUTPUTS the resulting string directly to HTML?",
          options: ["<% %>", "<%= %>", "<%# %>", "<%& %>"],
          correct: 1,
          rationale: "The equals sign tag <code>&lt;%= %&gt;</code> evaluates and renders the returned string, whereas <code>&lt;% %&gt;</code> only executes logic."
        }
      },
      {
        stepNumber: 105,
        level: "Core Practice",
        title: "105. Form Helpers form_with",
        prompt: "Write a simple form using form helper: <code>&lt;%= form_with url: '/posts' do %&gt;...&lt;% end %&gt;</code> inside the view template.",
        initialCode: {
          "app/views/posts/new.html.erb": "# Write form_with helper:\n"
        },
        hint: "<%= form_with url: '/posts' do %>\\n<% end %>",
        solution: "<%= form_with url: '/posts' do %>\n<% end %>",
        validate: async () => {
          const res = window.rubyVM.eval("$templates['posts/new']").toString();
          return res.includes("form_with") && res.includes("end");
        },
        quiz: {
          question: "Which form helper method is standard for generating forms in modern Rails?",
          options: ["form_tag", "form_for", "form_with", "make_form"],
          correct: 2,
          rationale: "<code>form_with</code> is the unified form helper introduced in Rails 5 to replace form_tag and form_for."
        }
      },
      {
        stepNumber: 106,
        level: "Core Practice",
        title: "106. Layouts yield inclusion",
        prompt: "Write a basic HTML skeleton including the dynamic body content insertion tag <code>&lt;%= yield %&gt;</code>.",
        initialCode: {
          "app/views/layouts/application.html.erb": "<body>\n  # Add yield statement:\n</body>"
        },
        hint: "<%= yield %>",
        solution: "<body>\n  <%= yield %>\n</body>",
        validate: async () => {
          const res = window.rubyVM.eval("$templates['layouts/application']").toString();
          return res.includes("yield");
        },
        quiz: {
          question: "What does the <code>yield</code> statement do inside a Rails layout template?",
          options: ["Exits the view early", "Injects the content of the view template rendered by the action", "Preloads a database model", "Defines variable parameters"],
          correct: 1,
          rationale: "<code>&lt;%= yield %&gt;</code> identifies the slot where page-specific template files render inside the global layout frame."
        }
      },
      {
        stepNumber: 107,
        level: "Core Practice",
        title: "107. Rendering View Partials",
        prompt: "Render a partial template named <code>'form'</code> in the edit page using <code>&lt;%= render 'form' %&gt;</code>.",
        initialCode: {
          "app/views/posts/edit.html.erb": "# Render form partial:\n"
        },
        hint: "<%= render 'form' %>",
        solution: "<%= render 'form' %>",
        validate: async () => {
          const res = window.rubyVM.eval("$templates['posts/edit']").toString();
          return res.includes("render") && res.includes("'form'");
        },
        quiz: {
          question: "How must a partial view template filename start?",
          options: ["With a hash (#)", "With an underscore (_)", "With a capital letter", "With the keyword partial_"],
          correct: 1,
          rationale: "Partial views are prefixed with an underscore (e.g. <code>_form.html.erb</code>) to identify them to the rendering engine."
        }
      },
      {
        stepNumber: 108,
        level: "Challenge",
        title: "108. View Helpers link_to",
        prompt: "Use the link helper <code>&lt;%= link_to 'Home', '/' %&gt;</code> inside the view to render a homepage link.",
        initialCode: {
          "app/views/posts/show.html.erb": "# Add link helper:\n"
        },
        hint: "<%= link_to 'Home', '/' %>",
        solution: "<%= link_to 'Home', '/' %>",
        validate: async () => {
          const res = window.rubyVM.eval("$templates['posts/show']").toString();
          return res.includes("link_to") && res.includes("'Home'");
        },
        quiz: {
          question: "What does the view helper <code>link_to 'Home', '/'</code> render in the final HTML page?",
          options: ["<a href='/'>Home</a>", "<link src='/'>Home</link>", "<button onclick=\"location.href='/'\">Home</button>", "An image element"],
          correct: 0,
          rationale: "<code>link_to</code> generates standard HTML anchor tags (<code>&lt;a&gt;</code>) with the given label text and path."
        }
      }
    ]
  },
  {
    id: 21,
    title: "Low-Level Loop Control",
    duration: "20 min",
    theory: `
      <p>While standard Ruby prefers block-iterators, low-level loops like <code>while</code> and <code>until</code> combined with loop directives (<code>break</code>, <code>next</code>, <code>redo</code>) are crucial for conditional state cycles.</p>
    `,
    exercises: [
      {
        stepNumber: 109,
        level: "Warm-Up",
        title: "109. The while Loop",
        prompt: "Write a <code>while</code> loop that runs while a counter <code>i</code> is less than or equal to <code>5</code>. Print <code>i</code> inside the loop, and increment it. Start <code>i = 1</code>.",
        initialCode: `i = 1\n# Write while loop below:\n`,
        hint: "while i <= 5\n  puts i\n  i += 1\nend",
        solution: "i = 1\nwhile i <= 5\n  puts i\n  i += 1\nend",
        validate: (out) => out.replace(/\s+/g, '').includes("12345"),
        quiz: {
          question: "A <code>while</code> loop executes its code block as long as the condition is...",
          options: ["true", "false", "nil", "zero"],
          correct: 0,
          rationale: "A <code>while</code> loop continues evaluation as long as the conditional test evaluates to a truthy value."
        }
      },
      {
        stepNumber: 110,
        level: "Core Practice",
        title: "110. The until Loop",
        prompt: "Write an <code>until</code> loop that prints <code>i</code> and increments it, running until <code>i > 5</code>. Initialize <code>i = 1</code>.",
        initialCode: `i = 1\n# Write until loop below:\n`,
        hint: "until i > 5\n  puts i\n  i += 1\nend",
        solution: "i = 1\nuntil i > 5\n  puts i\n  i += 1\nend",
        validate: (out) => out.replace(/\s+/g, '').includes("12345"),
        quiz: {
          question: "An <code>until</code> loop continues running as long as the condition is...",
          options: ["true", "false / nil", "numeric", "undefined"],
          correct: 1,
          rationale: "<code>until</code> is the opposite of <code>while</code>; it runs as long as the condition evaluates to false."
        }
      },
      {
        stepNumber: 111,
        level: "Core Practice",
        title: "111. Loop Control: break",
        prompt: "Write a loop from <code>1..10</code> using <code>.each</code>, but add a line to <code>break</code> the loop if the number is <code>6</code>. Print the numbers.",
        initialCode: `(1..10).each do |n|\n  # print n, and break if n == 6\nend`,
        hint: "puts n\nbreak if n == 6",
        solution: "(1..10).each do |n|\n  puts n\n  break if n == 6\nend",
        validate: (out) => out.replace(/\s+/g, '').includes("123456") && !out.includes("7"),
        quiz: {
          question: "What does the <code>break</code> keyword do inside a loop?",
          options: ["Skips to next element", "Exits the loop block immediately", "Restarts the current element iteration", "Raises a LocalJumpError"],
          correct: 1,
          rationale: "<code>break</code> terminates loop execution instantly, sending control to the line following the loop block."
        }
      },
      {
        stepNumber: 112,
        level: "Core Practice",
        title: "112. Loop Control: next",
        prompt: "Loop from <code>1..5</code> using <code>.each</code>, but use <code>next</code> to skip printing odd numbers. Print the even numbers.",
        initialCode: `(1..5).each do |n|\n  # Skip odd values using next, then print n:\nend`,
        hint: "next if n.odd?\nputs n",
        solution: "(1..5).each do |n|\n  next if n.odd?\n  puts n\nend",
        validate: (out) => out.replace(/\s+/g, '') === "24",
        quiz: {
          question: "Which keyword skips the rest of the current loop iteration and moves to the next item?",
          options: ["skip", "continue", "next", "redo"],
          correct: 2,
          rationale: "The <code>next</code> keyword skips the remaining expressions in the current block, starting the next loop iteration."
        }
      },
      {
        stepNumber: 113,
        level: "Challenge",
        title: "113. Loop Control: redo",
        prompt: "Write a loop that prints a value. Given state <code>attempts = 0</code>, loop <code>1.times</code>, print <code>attempts</code>, increment it, and trigger <code>redo if attempts < 3</code>.",
        initialCode: `attempts = 0\n1.times do\n  # Print attempts, increment it, and redo if attempts < 3:\nend`,
        hint: "puts attempts\nattempts += 1\nredo if attempts < 3",
        solution: "attempts = 0\n1.times do\n  puts attempts\n  attempts += 1\n  redo if attempts < 3\nend",
        validate: (out) => out.replace(/\s+/g, '').includes("012"),
        quiz: {
          question: "What does the <code>redo</code> keyword do?",
          options: ["Retries the whole loop from step 1", "Re-evaluates the loop condition", "Repeats the current loop iteration without testing the condition or loading next elements", "Exits the program"],
          correct: 2,
          rationale: "<code>redo</code> restarts the current loop iteration from the beginning of the block, without evaluating the loop condition or advancing the iterator."
        }
      }
    ]
  },
  {
    id: 22,
    title: "File I/O & Filesystems",
    duration: "25 min",
    theory: `
      <p>Ruby interacts with files using the global <code>File</code> class and directories using <code>Dir</code>. We have mocked these classes inside the browser WASM engine to run seamlessly.</p>
    `,
    exercises: [
      {
        stepNumber: 114,
        level: "Warm-Up",
        title: "114. Reading Files",
        prompt: "Read the content of a mock file named <code>'config.json'</code> using <code>File.read</code> and print it.",
        initialCode: `# Read and print config.json:\n`,
        hint: "puts File.read('config.json')",
        solution: "puts File.read('config.json')",
        validate: (out) => out.includes("{") || out.includes("database"),
        quiz: {
          question: "Which method reads the entire contents of a file as a String in one call?",
          options: ["File.open", "File.read", "File.load", "File.parse"],
          correct: 1,
          rationale: "<code>File.read(path)</code> opens the file, reads it fully, closes it, and returns the content string."
        }
      },
      {
        stepNumber: 115,
        level: "Core Practice",
        title: "115. Writing Files",
        prompt: "Write the text <code>'booting'</code> to a file named <code>'app.log'</code> using <code>File.write</code>, then print the contents of that file.",
        initialCode: `# Write to app.log, then print it:\n`,
        hint: "File.write('app.log', 'booting')\nputs File.read('app.log')",
        solution: "File.write('app.log', 'booting')\nputs File.read('app.log')",
        validate: (out) => out.includes("booting"),
        quiz: {
          question: "What happens if you call <code>File.write(path, text)</code> on an existing file?",
          options: ["Appends text to the end", "Raises an IOError", "Overwrites the file contents completely", "Creates a duplicate copy"],
          correct: 2,
          rationale: "<code>File.write</code> defaults to overwriting files completely if they already exist."
        }
      },
      {
        stepNumber: 116,
        level: "Core Practice",
        title: "116. Appending to Files",
        prompt: "Open <code>'app.log'</code> in append mode (<code>'a'</code>) using <code>File.open('app.log', 'a')</code>, write <code>' done'</code> to it, and print the updated file contents.",
        initialCode: `# Open in 'a' mode, write, and puts:\n`,
        hint: "File.open('app.log', 'a') { |f| f.write(' done') }\nputs File.read('app.log')",
        solution: "File.open('app.log', 'a') { |f| f.write(' done') }\nputs File.read('app.log')",
        validate: (out) => out.includes("booting done"),
        quiz: {
          question: "Which mode flag is used with File.open to append content without overwriting existing data?",
          options: ["r", "w", "a", "x"],
          correct: 2,
          rationale: "The <code>'a'</code> flag stands for Append, positioning the write cursor at the end of the file."
        }
      },
      {
        stepNumber: 117,
        level: "Core Practice",
        title: "117. Directory Globbing",
        prompt: "Find all files ending with <code>'.rb'</code> using <code>Dir.glob('*.rb')</code> and print the list.",
        initialCode: `# Glob ruby files and print:\n`,
        hint: "puts Dir.glob('*.rb')",
        solution: "puts Dir.glob('*.rb')",
        validate: (out) => out.includes(".rb"),
        quiz: {
          question: "Which class and method are used to perform filename pattern matching (globbing) in directories?",
          options: ["File.glob", "Dir.glob", "Pathname.match", "Dir.list"],
          correct: 1,
          rationale: "<code>Dir.glob(pattern)</code> expands patterns (using wildcard tokens like <code>*</code>) into an array of matching paths."
        }
      },
      {
        stepNumber: 118,
        level: "Challenge",
        title: "118. File Properties check",
        prompt: "Check if the file <code>'app.log'</code> exists using <code>File.exist?</code> and print the boolean result.",
        initialCode: `# Check if app.log exists and puts:\n`,
        hint: "puts File.exist?('app.log')",
        solution: "puts File.exist?('app.log')",
        validate: (out) => out.includes("true"),
        quiz: {
          question: "Which predicate checks if a target path points to an actual existing file?",
          options: [".exists?", ".exist?", ".file?", ".present?"],
          correct: 1,
          rationale: "Ruby core uses the singular form <code>File.exist?(path)</code> to inspect path existence."
        }
      }
    ]
  },
  {
    id: 23,
    title: "Advanced OOP Mechanics",
    duration: "30 min",
    theory: `
      <p>Understanding method resolution dynamics, superclass accessors, and eigenclasses represents key intermediate OOP knowledge.</p>
    `,
    exercises: [
      {
        stepNumber: 119,
        level: "Warm-Up",
        title: "119. Superclass Callbacks",
        prompt: "Define a class <code>User</code> with method <code>role</code> returning <code>'User'</code>. Inherit <code>Admin < User</code> and override <code>role</code> to return <code>'Admin'</code>. Print <code>Admin.new.role</code>.",
        initialCode: `# Define User and Admin classes:\n`,
        hint: "class User; def role; 'User'; end; end\nclass Admin < User; def role; 'Admin'; end; end",
        solution: "class User; def role; 'User'; end; end\nclass Admin < User; def role; 'Admin'; end; end\nputs Admin.new.role",
        validate: (out) => out.includes("Admin"),
        quiz: {
          question: "What is the primary method lookup route when a method is called on a subclass?",
          options: ["It checks the parent superclass first", "It checks the subclass definition first, then ascends the ancestor chain", "It triggers method_missing immediately", "It scans global namespaces first"],
          correct: 1,
          rationale: "Ruby checks the object's direct class first; if not found, it traverses the ancestor chain (modules and superclasses)."
        }
      },
      {
        stepNumber: 120,
        level: "Core Practice",
        title: "120. Using the super keyword",
        prompt: "Inside subclass <code>Admin</code>, override <code>greet</code> to call <code>super</code> (which returns <code>'Hello'</code>) and append <code>' Admin'</code>. Print <code>Admin.new.greet</code>.",
        initialCode: `class User\n  def greet; "Hello"; end\nend\n\nclass Admin < User\n  # Override greet using super:\nend`,
        hint: "def greet\n  super + ' Admin'\nend\nputs Admin.new.greet",
        solution: "class User\n  def greet; \"Hello\"; end\nend\nclass Admin < User\n  def greet\n    super + ' Admin'\n  end\nend\nputs Admin.new.greet",
        validate: (out) => out.includes("Hello Admin"),
        quiz: {
          question: "What does calling the <code>super</code> keyword inside an overridden method do?",
          options: ["Terminates execution", "Invokes the parent class version of the same method", "Instantiates a new superclass object", "Calls the initialize constructor method"],
          correct: 1,
          rationale: "The <code>super</code> keyword searches up the ancestors chain for a method of the same name and executes it."
        }
      },
      {
        stepNumber: 121,
        level: "Core Practice",
        title: "121. Class Instance Variables",
        prompt: "Declare a class instance variable <code>@config = 'Conf'</code> inside the class scope of <code>App</code>. Define a class method <code>self.config</code> returning it, and print <code>App.config</code>.",
        initialCode: `class App\n  # Define class instance variable and reader:\nend`,
        hint: "@config = 'Conf'\ndef self.config; @config; end",
        solution: "class App\n  @config = 'Conf'\n  def self.config\n    @config\n  end\nend\nputs App.config",
        validate: (out) => out.includes("Conf"),
        quiz: {
          question: "How do class variables (<code>@@var</code>) differ from class instance variables (<code>@var</code> declared in class scope)?",
          options: ["Class instance variables are shared across subclasses; class variables are not", "Class variables are shared down the inheritance tree; class instance variables are unique to that specific class object", "There is no difference", "Class variables are local only"],
          correct: 1,
          rationale: "Class variables (<code>@@var</code>) are shared across subclasses and instances, while class instance variables (<code>@var</code> inside class definition) are isolated to the specific class object."
        }
      },
      {
        stepNumber: 122,
        level: "Core Practice",
        title: "122. Singleton Classes (Eigenclass)",
        prompt: "Open the singleton class of object <code>str = 'hello'</code> using <code>class << str</code> and define method <code>whisper</code> returning <code>'shh...'</code>. Print <code>str.whisper</code>.",
        initialCode: `str = "hello"\n# Open singleton class of str:\n`,
        hint: "class << str\n  def whisper; 'shh...'; end\nend\nputs str.whisper",
        solution: "str = \"hello\"\nclass << str\n  def whisper\n    'shh...'\n  end\nend\nputs str.whisper",
        validate: (out) => out.includes("shh..."),
        quiz: {
          question: "What is a singleton class (also called Eigenclass) in Ruby?",
          options: ["A class that can only be instantiated once", "An anonymous class inserted in the lookup path for a single specific object instance", "A class representing global parameters", "A subclass of ActiveRecord"],
          correct: 1,
          rationale: "The Eigenclass holds methods defined exclusively on a single object instance (e.g. <code>class &lt;&lt; obj</code>)."
        }
      },
      {
        stepNumber: 123,
        level: "Challenge",
        title: "123. Refinements in Ruby",
        prompt: "Define a module <code>StringPatch</code>. Inside it, refine class <code>String</code> with method <code>add_star</code> returning <code>self + '*'</code>. Activate refinements and print <code>'hi'.add_star</code>.",
        initialCode: `# Refine String inside module and activate it:\n`,
        hint: "module StringPatch\n  refine String do\n    def add_star; self + '*'; end\n  end\nend\nusing StringPatch\nputs 'hi'.add_star",
        solution: "module StringPatch\n  refine String do\n    def add_star\n      self + '*'\n    end\n  end\nend\nusing StringPatch\nputs 'hi'.add_star",
        validate: (out) => out.includes("hi*"),
        quiz: {
          question: "Why are refinements preferred over monkey patching?",
          options: ["They execute faster", "Their extensions are scoped lexically, avoiding global namespace pollution", "They do not require module definitions", "They automatically validate code formats"],
          correct: 1,
          rationale: "Refinements scope modifications locally to files or blocks using the <code>using</code> statement, protecting external code."
        }
      }
    ]
  },
  {
    id: 24,
    title: "Testing & Debugging",
    duration: "25 min",
    theory: `
      <p>Tests assert logic correctness. RSpec is the leading BDD framework. Debugging triggers runtime breakpoints.</p>
    `,
    exercises: [
      {
        stepNumber: 124,
        level: "Warm-Up",
        title: "124. Minitest Assertions",
        prompt: "Write a simple validation using a conditional check that prints <code>'Assert Passed'</code> if <code>5 + 5 == 10</code>.",
        initialCode: `# Validate equality and print:\n`,
        hint: "puts 'Assert Passed' if 5 + 5 == 10",
        solution: "puts 'Assert Passed' if 5 + 5 == 10",
        validate: (out) => out.includes("Assert Passed"),
        quiz: {
          question: "Which assertions class is native to Ruby's default standard library testing framework?",
          options: ["RSpec", "Minitest::Test", "Cucumber", "Capybara"],
          correct: 1,
          rationale: "Minitest is standard library software, providing assertion methodologies natively."
        }
      },
      {
        stepNumber: 125,
        level: "Core Practice",
        title: "125. RSpec Describe & It",
        prompt: "Define a spec block using the RSpec simulator class: <code>describe 'Post' do it 'runs' do puts 'RSpec Executed' end end</code>.",
        initialCode: `# Write describe block:\n`,
        hint: "describe 'Post' do\n  it 'runs' do\n    puts 'RSpec Executed'\n  end\nend",
        solution: "describe 'Post' do\n  it 'runs' do\n    puts 'RSpec Executed'\n  end\nend",
        validate: (out) => out.includes("RSpec Executed") && out.includes("PASSED"),
        quiz: {
          question: "Which block organizes related test examples in RSpec?",
          options: ["it", "test", "describe", "setup"],
          correct: 2,
          rationale: "<code>describe</code> creates ExampleGroups containing individual testing specifications."
        }
      },
      {
        stepNumber: 126,
        level: "Core Practice",
        title: "126. RSpec Expect Matchers",
        prompt: "Write a spec asserting that <code>10</code> equals <code>10</code> using <code>expect(10).to eq(10)</code> inside a block.",
        initialCode: `describe "Math" do\n  it "equals 10" do\n    # Assert 10 equals 10:\n  end\nend`,
        hint: "expect(10).to eq(10)",
        solution: "describe \"Math\" do\n  it \"equals 10\" do\n    expect(10).to eq(10)\n  end\nend",
        validate: (out) => out.includes("PASSED"),
        quiz: {
          question: "What is the standard BDD assertion statement structure in modern RSpec?",
          options: ["assert_equal x, y", "expect(x).to eq(y)", "x.should == y", "verify x matches y"],
          correct: 1,
          rationale: "RSpec standard BDD uses <code>expect(actual).to matcher(expected)</code>."
        }
      },
      {
        stepNumber: 127,
        level: "Core Practice",
        title: "127. Standard Breakpoints",
        prompt: "Print the method call statement used in Ruby 3+ to pause execution and enter the interactive debugger console (e.g. print <code>'binding.break'</code>).",
        initialCode: `# Print debugger call:\n`,
        hint: "puts 'binding.break'",
        solution: "puts 'binding.break'",
        validate: (out) => out.includes("binding.break"),
        quiz: {
          question: "What is the default binding target breakpoint syntax introduced natively in Ruby 3.1?",
          options: ["binding.pry", "debugger", "binding.break", "break_point"],
          correct: 2,
          rationale: "Ruby 3.1 integrates the <code>debug</code> gem, supporting native <code>binding.break</code> breakpoints."
        }
      },
      {
        stepNumber: 128,
        level: "Challenge",
        title: "128. Pry Console Debugger",
        prompt: "Print the statement used to invoke the popular interactive developer shell Pry (e.g. <code>'binding.pry'</code>).",
        initialCode: `# Print Pry invocation:\n`,
        hint: "puts 'binding.pry'",
        solution: "puts 'binding.pry'",
        validate: (out) => out.includes("binding.pry"),
        quiz: {
          question: "Which gem provides advanced object inspection, colorized output, and binding scopes lookup inside the console terminal?",
          options: ["debug", "pry", "byebug", "rubocop"],
          correct: 1,
          rationale: "Pry is a popular alternative terminal console replacing standard IRB bindings dynamically."
        }
      }
    ]
  },
  {
    id: 25,
    title: "Concurrency & Fibers",
    duration: "25 min",
    theory: `
      <p>Concurrency splits task scheduling. Threads run parallel steps sharing memory. Fibers pause cooperatively. Ractors run isolated structures.</p>
    `,
    exercises: [
      {
        stepNumber: 129,
        level: "Warm-Up",
        title: "129. Spawning Threads",
        prompt: "Spawn a thread using <code>Thread.new</code> that sets local variable <code>x = 'Run'</code>, then call <code>.join</code> on the thread and print <code>x</code>.",
        initialCode: `# Spawn thread and puts x:\n`,
        hint: "t = Thread.new { x = 'Run' }\nt.join\nputs x",
        solution: "x = nil\nt = Thread.new { x = 'Run' }\nt.join\nputs x",
        validate: (out) => out.includes("Run"),
        quiz: {
          question: "What must you invoke on a spawned Thread object to wait for its processing task to finish before proceeding?",
          options: [".wait", ".join", ".stop", ".resume"],
          correct: 1,
          rationale: "<code>.join</code> suspends execution of the main script thread until the target thread finishes."
        }
      },
      {
        stepNumber: 130,
        level: "Core Practice",
        title: "130. Mutex Synchronization",
        prompt: "Explain how to protect variable mutations using a Mutex. Print the initializer call syntax (e.g. <code>'Mutex.new'</code>).",
        initialCode: `# Print Mutex initializer:\n`,
        hint: "puts 'Mutex.new'",
        solution: "puts 'Mutex.new'",
        validate: (out) => out.includes("Mutex.new"),
        quiz: {
          question: "Why do we use a Mutex (Mutual Exclusion) object in multi-threaded Ruby code?",
          options: ["To speed up calculations", "To synchronize access to shared resources, preventing race conditions", "To bypass the GIL/GVL fully", "To run tasks in background sockets"],
          correct: 1,
          rationale: "A Mutex serializes access to variables so only one thread can modify them at a time, preventing data corruption."
        }
      },
      {
        stepNumber: 131,
        level: "Core Practice",
        title: "131. Fibers yield / resume",
        prompt: "Declare a Fiber: <code>f = Fiber.new { Fiber.yield 'val' }</code>. Print the returned value by calling <code>.resume</code> on it.",
        initialCode: `# Create Fiber and print resumed value:\n`,
        hint: "f = Fiber.new { Fiber.yield 'val' }\nputs f.resume",
        solution: "f = Fiber.new { Fiber.yield 'val' }\nputs f.resume",
        validate: (out) => out.includes("val"),
        quiz: {
          question: "How do Fibers differ from Threads in Ruby?",
          options: ["Fibers use multiple processor cores", "Fibers are cooperatively scheduled, meaning developers control when they pause and resume", "Fibers do not share memory space", "Fibers are only for database reads"],
          correct: 1,
          rationale: "Threads are pre-emptively scheduled by the OS; Fibers are lightweight threads run cooperatively under developer control (via yield/resume)."
        }
      },
      {
        stepNumber: 132,
        level: "Core Practice",
        title: "132. Ractors basic messaging",
        prompt: "Print the Ractor method used to receive an incoming message packet inside a spawned ractor block (e.g. <code>'Ractor.receive'</code>).",
        initialCode: `# Print receive statement:\n`,
        hint: "puts 'Ractor.receive'",
        solution: "puts 'Ractor.receive'",
        validate: (out) => out.includes("Ractor.receive"),
        quiz: {
          question: "What is the primary feature of Ractors (Ruby Actors) introduced in Ruby 3?",
          options: ["Parallel execution with thread-safe isolated memory, avoiding GVL blocks", "Automatic SQL querying optimization", "Dynamic routing maps", "HTML templates compiling"],
          correct: 0,
          rationale: "Ractors do not share mutable state by default, allowing true parallel execution across multiple cores safely."
        }
      },
      {
        stepNumber: 133,
        level: "Challenge",
        title: "133. Concurrent Promises",
        prompt: "Write a string describing a Promise representing an asynchronous value resolved in the future (e.g. print <code>'Promise'</code>).",
        initialCode: `# Print Promise identifier:\n`,
        hint: "puts 'Promise'",
        solution: "puts 'Promise'",
        validate: (out) => out.includes("Promise"),
        quiz: {
          question: "Which concurrency design represents a promise to return a calculated value in the future, handling successes/failures asynchronously?",
          options: ["Promise", "Mutex", "Fiber", "Queue"],
          correct: 0,
          rationale: "A Promise wraps async processes, triggering callback loops once value calculation succeeds or fails."
        }
      }
    ]
  }
];
