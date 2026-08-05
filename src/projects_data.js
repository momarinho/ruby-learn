// Projects Data definition for Rails Capstone Projects
const projectsData = [
  {
    id: "blog",
    title: "Build a Blog with Rails 7",
    difficulty: "Beginner",
    duration: "5h 17m",
    unlockedAtStep: 83,
    description: "Build a complete blog from scratch to master routes, models, views, controllers, migrations, ActionText, and ActiveStorage uploads.",
    stages: [
      {
        stageNumber: 1,
        title: "1. Blog Routing Setup",
        prompt: "Configure RESTful routes for <code>articles</code> resource in <code>config/routes.rb</code> and set root URL to articles index action.",
        initialCode: {
          "config/routes.rb": "Rails.application.routes.draw do\n  # Draw RESTful resources and root:\nend"
        },
        hint: "resources :articles\nroot to: 'articles#index'",
        solution: "Rails.application.routes.draw do\n  resources :articles\n  root to: 'articles#index'\nend",
        validate: async () => {
          try {
            const hasIndex = window.rubyVM.eval("Rails::Router.routes.any? { |r| r[:path] == '/articles' && r[:to] == 'articles#index' }").toString();
            const hasRoot = window.rubyVM.eval("Rails::Router.routes.any? { |r| r[:path] == '/' && r[:to] == 'articles#index' }").toString();
            return hasIndex === "true" && hasRoot === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which router method automatically configures RESTful mappings for a resource?",
          options: ["match", "resources", "resource", "get"],
          correct: 1,
          rationale: "The <code>resources</code> helper configures standard routes mapping RESTful actions."
        }
      },
      {
        stageNumber: 2,
        title: "2. Article Table Migration",
        prompt: "Write a migration class <code>CreateArticles</code> in <code>db/migrate/create_articles.rb</code> creating table <code>articles</code> with <code>title</code> (string) and <code>body</code> (text) columns.",
        initialCode: {
          "db/migrate/create_articles.rb": "class CreateArticles < ActiveRecord::Migration\n  def change\n    # Create table for articles:\n  end\nend"
        },
        hint: "ActiveRecord::Migration.create_table :articles do |t|\n  t.string :title\n  t.text :body\nend",
        solution: "class CreateArticles < ActiveRecord::Migration\n  def change\n    ActiveRecord::Migration.create_table :articles do |t|\n      t.string :title\n      t.text :body\n    end\n  end\nend",
        validate: async () => {
          try {
            window.rubyVM.eval("CreateArticles.new.change");
            const cols = window.rubyVM.eval("$table_columns['articles']").toJS();
            return cols.includes("title") && cols.includes("body");
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which data type is best suited for long descriptive contents?",
          options: ["string", "text", "binary", "varchar"],
          correct: 1,
          rationale: "The <code>text</code> column type handles large paragraphs."
        }
      },
      {
        stageNumber: 3,
        title: "3. Article Model Validations",
        prompt: "Create <code>Article</code> class in <code>app/models/article.rb</code>. Require <code>title</code> presence and <code>body</code> presence with minimum length 10.",
        initialCode: {
          "app/models/article.rb": "# Define Article model and validations:\n"
        },
        hint: "class Article < ActiveRecord::Base\n  validates :title, presence: true\n  validates :body, presence: true, length: { minimum: 10 }\nend",
        solution: "class Article < ActiveRecord::Base\n  validates :title, presence: true\n  validates :body, presence: true, length: { minimum: 10 }\nend",
        validate: async () => {
          try {
            const exists = window.rubyVM.eval("defined?(Article)").toString();
            if (exists !== "constant") return false;
            const testCode = `
              a = Article.new
              v1 = a.valid?
              a.title = 'Hello'
              a.body = 'Short'
              v2 = a.valid?
              a.body = 'Long enough body here'
              v3 = a.valid?
              [v1, v2, v3]
            `;
            const res = window.rubyVM.eval(testCode).toJS();
            return res[0] === false && res[1] === false && res[2] === true;
          } catch(e) { return false; }
        },
        quiz: {
          question: "How do you specify minimum character requirements in validations?",
          options: ["validates :attr, minimum: 10", "validates :attr, length: { minimum: 10 }", "validates_length_of :attr, over: 10", "attribute :attr, limit: 10"],
          correct: 1,
          rationale: "The <code>length: { minimum: N }</code> constraint specifies size thresholds."
        }
      },
      {
        stageNumber: 4,
        title: "4. Articles Controller CRUD",
        prompt: "Build <code>ArticlesController</code> in <code>app/controllers/articles_controller.rb</code> with actions <code>index</code> (returns <code>Article.all</code>) and <code>create</code> using strong parameters <code>article_params</code>.",
        initialCode: {
          "app/controllers/articles_controller.rb": "class ArticlesController < ApplicationController\n  # Implement index, create, and private article_params:\nend"
        },
        hint: "private\ndef article_params\n  params.require(:article).permit(:title, :body)\nend",
        solution: "class ArticlesController < ApplicationController\n  def index\n    Article.all\n  end\n  def create\n    Article.create!(article_params)\n    'Created'\n  end\n  private\n  def article_params\n    params.require(:article).permit(:title, :body)\n  end\nend",
        validate: async () => {
          try {
            const testParams = `
              class ParamsMock
                def initialize(h); @h = h; end
                def require(key); ParamsMock.new(@h[key]); end
                def permit(*args); @h.select { |k, v| args.include?(k) }; end
              end
              c = ArticlesController.new
              c.params = ParamsMock.new({ article: { title: 'T', body: 'Valid body text' } })
              c.send(:article_params).keys.include?(:title)
            `;
            return window.rubyVM.eval(testParams).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which private helper method secures incoming controller arguments?",
          options: ["strong_params", "permit_params", "article_params", "sanitize_params"],
          correct: 2,
          rationale: "Strong Parameters methods (like `article_params`) whitelist expected keys."
        }
      },
      {
        stageNumber: 5,
        title: "5. ActionText Rich Text",
        prompt: "Declare <code>has_rich_text :content</code> on model <code>Article</code>. Update <code>app/views/articles/_form.html.erb</code> with <code>f.rich_text_area :content</code> and permit <code>:content</code> in controller params.",
        initialCode: {
          "app/models/article.rb": "class Article < ActiveRecord::Base\n  validates :title, presence: true\nend",
          "app/views/articles/_form.html.erb": "<%= form_with model: @article do |f| %>\n  # Write form with rich_text_area:\n<% end %>",
          "app/controllers/articles_controller.rb": "class ArticlesController < ApplicationController\n  private\n  def article_params\n    params.require(:article).permit(:title, :body)\n  end\nend"
        },
        hint: "Model: has_rich_text :content\nForm: f.rich_text_area :content\nController: permit(:title, :content)",
        solution: "class Article < ActiveRecord::Base\n  validates :title, presence: true\n  has_rich_text :content\nend\n# form:\n<%= form_with model: @article do |f| %>\n  <%= f.rich_text_area :content %>\n<% end %>\n# controller:\ndef article_params\n  params.require(:article).permit(:title, :content)\nend",
        validate: async () => {
          try {
            const formHtml = window.rubyVM.eval("$templates['articles/_form']").toString();
            return formHtml.includes("rich_text_area");
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which ActionText editor area helper is standard for forms?",
          options: ["text_area", "rich_text_area", "editor_area", "wysiwyg_field"],
          correct: 1,
          rationale: "<code>rich_text_area</code> generates the Trix Editor markup for ActionText fields."
        }
      },
      {
        stageNumber: 6,
        title: "6. ActiveStorage Image Uploads",
        prompt: "Add attachment definition <code>has_one_attached :cover_image</code> inside model <code>Article</code>. Update form partial with <code>f.file_field :cover_image</code> and permit it in controller.",
        initialCode: {
          "app/models/article.rb": "class Article < ActiveRecord::Base\n  # Add attachment definition:\nend",
          "app/views/articles/_form.html.erb": "<%= form_with model: @article do |f| %>\n  # Add file_field helper:\n<% end %>",
          "app/controllers/articles_controller.rb": "class ArticlesController < ApplicationController\n  # Permit cover_image in article_params:\nend"
        },
        hint: "Model: has_one_attached :cover_image\nForm: f.file_field :cover_image\nController: permit(:cover_image)",
        solution: "class Article < ActiveRecord::Base\n  has_one_attached :cover_image\nend\n# form:\n<%= form_with model: @article do |f| %>\n  <%= f.file_field :cover_image %>\n<% end %>\n# controller:\ndef article_params\n  params.require(:article).permit(:cover_image)\nend",
        validate: async () => {
          try {
            const formHtml = window.rubyVM.eval("$templates['articles/_form']").toString();
            return formHtml.includes("file_field");
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which ActiveStorage relationship helper is used for single file attachments?",
          options: ["has_one_attached", "has_many_attached", "belongs_to_file", "mount_uploader"],
          correct: 0,
          rationale: "<code>has_one_attached</code> associates a single file attachment to the model."
        }
      }
    ]
  },
  {
    id: "password",
    title: "Build a Password Manager with Rails 7",
    difficulty: "Beginner",
    duration: "3h 40m",
    unlockedAtStep: 95,
    description: "Securely encrypt credentials with ActiveRecord Encryption, build sharing via join tables with roles, and generate secure random passwords.",
    stages: [
      {
        stageNumber: 1,
        title: "1. Credentials Table Migration",
        prompt: "Create table migration <code>CreateCredentials</code> in <code>db/migrate/create_credentials.rb</code> with <code>username</code> (string), <code>password</code> (string), and <code>url</code> (string).",
        initialCode: {
          "db/migrate/create_credentials.rb": "class CreateCredentials < ActiveRecord::Migration\n  def change\n    # Create credentials table:\n  end\nend"
        },
        hint: "ActiveRecord::Migration.create_table :credentials do |t|\n  t.string :username\n  t.string :password\n  t.string :url\nend",
        solution: "class CreateCredentials < ActiveRecord::Migration\n  def change\n    ActiveRecord::Migration.create_table :credentials do |t|\n      t.string :username\n      t.string :password\n      t.string :url\n    end\n  end\nend",
        validate: async () => {
          try {
            window.rubyVM.eval("CreateCredentials.new.change");
            const cols = window.rubyVM.eval("$table_columns['credentials']").toJS();
            return cols.includes("username") && cols.includes("password");
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which Migration helper method creates a table?",
          options: ["create_table", "add_table", "new_table", "build_table"],
          correct: 0,
          rationale: "<code>create_table</code> defines table schema structures in migrations."
        }
      },
      {
        stageNumber: 2,
        title: "2. Credentials Encryption",
        prompt: "Secure passwords in database. Use <code>encrypts :password</code> inside <code>Credential</code> model in <code>app/models/credential.rb</code>.",
        initialCode: {
          "app/models/credential.rb": "class Credential < ActiveRecord::Base\n  # Add credential encryption:\nend"
        },
        hint: "class Credential < ActiveRecord::Base\n  encrypts :password\nend",
        solution: "class Credential < ActiveRecord::Base\n  encrypts :password\nend",
        validate: async () => {
          try {
            const exists = window.rubyVM.eval("defined?(Credential)").toString();
            if (exists !== "constant") return false;
            const testCode = `
              class << Credential
                attr_accessor :encrypted_attributes
                def encrypts(*attrs)
                  @encrypted_attributes = attrs
                end
              end
              eval($mock_files[\"app/models/credential.rb\"] || \"\")
              Credential.encrypted_attributes.include?(:password) rescue false
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which Rails feature encrypts database columns natively?",
          options: ["ActiveRecord Encryption", "BCrypt", "AES-256 Gem", "DB-crypt"],
          correct: 0,
          rationale: "ActiveRecord Encryption was integrated in Rails 7 to allow automatic encryption and decryption of fields at the query layer."
        }
      },
      {
        stageNumber: 3,
        title: "3. Joining Shares with Roles",
        prompt: "In <code>app/models/share.rb</code>, declare join model that <code>belongs_to :user</code>, <code>belongs_to :credential</code>, and validates <code>role</code> inclusion in <code>['viewer', 'editor']</code>.",
        initialCode: {
          "app/models/share.rb": "class Share < ActiveRecord::Base\n  # Establish associations and validations:\nend"
        },
        hint: "belongs_to :user\nbelongs_to :credential\nvalidates :role, presence: true, inclusion: { in: ['viewer', 'editor'] }",
        solution: "class Share < ActiveRecord::Base\n  belongs_to :user\n  belongs_to :credential\n  validates :role, presence: true, inclusion: { in: ['viewer', 'editor'] }\nend",
        validate: async () => {
          try {
            const exists = window.rubyVM.eval("defined?(Share)").toString();
            if (exists !== "constant") return false;
            const testCode = `
              class User < ActiveRecord::Base; end
              class Credential < ActiveRecord::Base; end
              s = Share.new(role: 'invalid')
              val1 = s.valid? rescue true
              s.role = 'viewer'
              val2 = s.valid? rescue false
              [val1, val2]
            `;
            const res = window.rubyVM.eval(testCode).toJS();
            return res[0] === false && res[1] === true;
          } catch(e) { return false; }
        },
        quiz: {
          question: "What type of validation restricts attribute values to a pre-defined list?",
          options: ["inclusion", "presence", "format", "length"],
          correct: 0,
          rationale: "The <code>inclusion: { in: [...] }</code> validator restricts fields to matching array elements."
        }
      },
      {
        stageNumber: 4,
        title: "4. Password Generator Service",
        prompt: "Create password generator service <code>PasswordGenerator</code> in <code>app/services/password_generator.rb</code> with class method <code>self.generate(len=16)</code> returning random string from SecureRandom.",
        initialCode: {
          "app/services/password_generator.rb": "require 'securerandom'\nclass PasswordGenerator\n  def self.generate(length = 16)\n    # Generate secure random hex or base64 string:\n  end\nend"
        },
        hint: "SecureRandom.hex(length)[0...length]",
        solution: "require 'securerandom'\nclass PasswordGenerator\n  def self.generate(length = 16)\n    SecureRandom.hex(length)[0...length]\n  end\nend",
        validate: async () => {
          try {
            const pwd = window.rubyVM.eval("PasswordGenerator.generate(12)").toString();
            return pwd.length === 12;
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which Ruby standard library provides cryptographically secure random number generation?",
          options: ["SecureRandom", "Random", "Crypto", "Math"],
          correct: 0,
          rationale: "<code>SecureRandom</code> generates cryptographically secure pseudorandom numbers."
        }
      },
      {
        stageNumber: 5,
        title: "5. Credentials Controller Actions",
        prompt: "Build <code>CredentialsController</code> in <code>app/controllers/credentials_controller.rb</code> with action <code>show</code> finding record by <code>params[:id]</code> and rendering JSON data.",
        initialCode: {
          "app/controllers/credentials_controller.rb": "class CredentialsController < ApplicationController\n  # Implement show action returning JSON:\nend"
        },
        hint: "def show\n  @credential = Credential.find(params[:id])\n  @credential.to_json\nend",
        solution: "class CredentialsController < ApplicationController\n  def show\n    @credential = Credential.find(params[:id])\n    @credential.to_json\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class Credential < ActiveRecord::Base
                def self.find(id); c = new; c; end
                def to_json; '{"id":1}'; end
              end
              c = CredentialsController.new
              c.params = { id: 1 }
              c.show == '{"id":1}'
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which method converts a Ruby Object or ActiveRecord Model to JSON string representation?",
          options: ["to_json", "as_json", "json_encode", "serialize"],
          correct: 0,
          rationale: "<code>to_json</code> converts objects directly into JSON string format."
        }
      }
    ]
  },
  {
    id: "budget",
    title: "Budget Tracker SPA",
    difficulty: "Intermediate",
    duration: "3h 11m",
    unlockedAtStep: 108,
    description: "Strengthen your understanding of Hotwire (Turbo Frames, Streams) to build a budget tracker that feels like a single-page app.",
    stages: [
      {
        stageNumber: 1,
        title: "1. Transaction & Category Models",
        prompt: "Create models in <code>app/models/category.rb</code> (has_many :transactions) and <code>app/models/transaction.rb</code> (belongs_to :category, validates :amount presence).",
        initialCode: {
          "app/models/category.rb": "class Category < ActiveRecord::Base\n  # Association:\nend",
          "app/models/transaction.rb": "class Transaction < ActiveRecord::Base\n  # Association & Validation:\nend"
        },
        hint: "Category: has_many :transactions\nTransaction: belongs_to :category\nvalidates :amount, presence: true",
        solution: "class Category < ActiveRecord::Base\n  has_many :transactions\nend\nclass Transaction < ActiveRecord::Base\n  belongs_to :category\n  validates :amount, presence: true\nend",
        validate: async () => {
          try {
            const testCode = `
              c = Category.associations.key?(:transactions) rescue false
              t = Transaction.new
              v = t.valid? rescue true
              c && !v
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which association macro links transactions back to their parent category?",
          options: ["belongs_to", "has_many", "has_one", "connects_to"],
          correct: 0,
          rationale: "<code>belongs_to</code> specifies a one-to-many relationship child connection."
        }
      },
      {
        stageNumber: 2,
        title: "2. Financial Aggregations Scope",
        prompt: "Add scope <code>self.total_spent</code> on <code>Transaction</code> model in <code>app/models/transaction.rb</code> returning <code>sum(:amount)</code>.",
        initialCode: {
          "app/models/transaction.rb": "class Transaction < ActiveRecord::Base\n  # Add self.total_spent method:\nend"
        },
        hint: "def self.total_spent\n  sum(:amount)\nend",
        solution: "class Transaction < ActiveRecord::Base\n  def self.total_spent\n    sum(:amount)\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class << Transaction
                def sum(col); 150.0; end
              end
              Transaction.total_spent == 150.0
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which ActiveRecord calculation method computes sums directly in SQL?",
          options: ["sum", "total", "calculate", "aggregate"],
          correct: 0,
          rationale: "<code>sum(:column)</code> calculates column totals directly inside database queries."
        }
      },
      {
        stageNumber: 3,
        title: "3. Turbo Frame Form Render",
        prompt: "Wrap transaction creation in Turbo Frame. In <code>app/views/transactions/new.html.erb</code>, wrap form inside <code>&lt;%= turbo_frame_tag 'new_transaction' do %&gt;...&lt;% end %&gt;</code>.",
        initialCode: {
          "app/views/transactions/new.html.erb": "# Render view form wrapped in turbo_frame_tag:\n"
        },
        hint: "<%= turbo_frame_tag 'new_transaction' do %>\n  <%= form_with model: @transaction do |f| %>\n  <% end %>\n<% end %>",
        solution: "<%= turbo_frame_tag 'new_transaction' do %>\n  <%= form_with model: @transaction do |f| %>\n  <% end %>\n<% end %>",
        validate: async () => {
          try {
            const fileContent = window.rubyVM.eval("$templates['transactions/new'] || ''").toString();
            return fileContent.includes("turbo_frame_tag") && fileContent.includes("new_transaction");
          } catch(e) { return false; }
        },
        quiz: {
          question: "What is a Turbo Frame?",
          options: ["A background job supervisor", "An isolated view segment that replaces itself during link clicks/submissions without reloading the full page", "A database connection pool", "An asset pipeline compressor"],
          correct: 1,
          rationale: "Turbo Frames intercept actions inside their container, updating only the frame element."
        }
      },
      {
        stageNumber: 4,
        title: "4. Turbo Stream Live Append",
        prompt: "Add real-time UI updates without page reloads. In <code>app/controllers/transactions_controller.rb</code>, implement <code>create</code> action to render Turbo Stream appending partial <code>_transaction</code> to target <code>'transactions_list'</code>.",
        initialCode: {
          "app/controllers/transactions_controller.rb": "class TransactionsController < ApplicationController\n  # Implement create rendering turbo_stream:\nend"
        },
        hint: "render turbo_stream: turbo_stream.append('transactions_list', partial: 'transaction', locals: { transaction: @transaction })",
        solution: "class TransactionsController < ApplicationController\n  def create\n    @transaction = Transaction.create!(transaction_params)\n    render turbo_stream: turbo_stream.append('transactions_list', partial: 'transaction', locals: { transaction: @transaction })\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class TurboStreamMock
                def append(target, options); true; end
              end
              c = TransactionsController.new
              c.respond_to?(:create)
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which response format pushes targeted DOM updates via WebSockets or HTTP responses?",
          options: ["Turbo Stream", "Turbo Frame", "HTML Partial", "JSON API"],
          correct: 0,
          rationale: "Turbo Streams deliver precise DOM modifications (append, prepend, replace, remove) over HTTP or WebSockets."
        }
      },
      {
        stageNumber: 5,
        title: "5. Category Filter Controller Action",
        prompt: "Filter transactions by category. In <code>app/controllers/transactions_controller.rb</code>, implement <code>index</code> action querying transactions filtered by <code>params[:category_id]</code> if present.",
        initialCode: {
          "app/controllers/transactions_controller.rb": "class TransactionsController < ApplicationController\n  # Implement index with category filtering:\nend"
        },
        hint: "def index\n  if params[:category_id]\n    Transaction.where(category_id: params[:category_id])\n  else\n    Transaction.all\n  end\nend",
        solution: "class TransactionsController < ApplicationController\n  def index\n    if params[:category_id]\n      Transaction.where(category_id: params[:category_id])\n    else\n      Transaction.all\n    end\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class Transaction < ActiveRecord::Base
                def self.where(hash); [1]; end
              end
              c = TransactionsController.new
              c.params = { category_id: 5 }
              c.index == [1]
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which ActiveRecord method filters records based on attribute key-value conditions?",
          options: ["where", "filter", "select_by", "find_all"],
          correct: 0,
          rationale: "<code>where(attribute: value)</code> filters dataset matching target key conditions."
        }
      }
    ]
  },
  {
    id: "shortener",
    title: "Build a URL Shortener",
    difficulty: "Beginner",
    duration: "4h 13m",
    unlockedAtStep: 120,
    description: "Build a high-performance URL shortener featuring analytics tracking and custom Base62 encoding from scratch.",
    stages: [
      {
        stageNumber: 1,
        title: "1. Url Model Validations",
        prompt: "In <code>app/models/url.rb</code>, create <code>Url</code> model validating <code>original_url</code> presence and format format (must include 'http').",
        initialCode: {
          "app/models/url.rb": "class Url < ActiveRecord::Base\n  # Add original_url validations:\nend"
        },
        hint: "validates :original_url, presence: true, format: { with: /https?:\\/\\// }",
        solution: "class Url < ActiveRecord::Base\n  validates :original_url, presence: true, format: { with: /https?:\\/\\// }\nend",
        validate: async () => {
          try {
            const testCode = `
              u = Url.new(original_url: 'invalid')
              v1 = u.valid? rescue true
              u.original_url = 'https://ruby.org'
              v2 = u.valid? rescue false
              [v1, v2]
            `;
            const res = window.rubyVM.eval(testCode).toJS();
            return res[0] === false && res[1] === true;
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which validation option tests attribute strings against Regular Expressions?",
          options: ["format", "regex", "match", "pattern"],
          correct: 0,
          rationale: "The <code>format: { with: /regex/ }</code> option checks string formats using regular expressions."
        }
      },
      {
        stageNumber: 2,
        title: "2. Base62 Encoder Implementation",
        prompt: "Implement custom Base62 encoding in model <code>Url</code> at <code>app/models/url.rb</code>. Define class method <code>self.encode(id)</code> converting integer ID to base62 string.",
        initialCode: {
          "app/models/url.rb": "class Url < ActiveRecord::Base\n  ALPHABET = \"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\".split(//)\n  def self.encode(id)\n    # Convert integer ID to base62 string:\n  end\nend"
        },
        hint: "def self.encode(id)\n  return 'a' if id == 0\n  s = ''\n  while id > 0\n    s << ALPHABET[id % 62]\n    id /= 62\n  end\n  s.reverse\nend",
        solution: "class Url < ActiveRecord::Base\n  ALPHABET = \"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\".split(//)\n  def self.encode(id)\n    return ALPHABET[0] if id == 0\n    s = ''\n    while id > 0\n      s << ALPHABET[id % 62]\n      id /= 62\n    end\n    s.reverse\n  end\nend",
        validate: async () => {
          try {
            const res1 = window.rubyVM.eval("Url.encode(0)").toString();
            const res2 = window.rubyVM.eval("Url.encode(12345)").toString();
            return res1 === "a" && res2 === "dnh";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Why is Base62 encoding useful for URL shorteners?",
          options: ["It compresses database files", "It fits alphanumeric ranges exactly without special url characters", "It runs faster than MD5 hashes", "It translates binary streams"],
          correct: 1,
          rationale: "Base62 uses precisely `[a-zA-Z0-9]` characters, which are safe for URLs and don't require character escaping."
        }
      },
      {
        stageNumber: 3,
        title: "3. Shortener Controller Actions",
        prompt: "In <code>app/controllers/urls_controller.rb</code>, write <code>create</code> action instantiating <code>Url</code> record with <code>params[:url]</code> and returning shortened slug string.",
        initialCode: {
          "app/controllers/urls_controller.rb": "class UrlsController < ApplicationController\n  # Implement create action:\nend"
        },
        hint: "def create\n  @url = Url.create!(url_params)\n  Url.encode(@url.id)\nend",
        solution: "class UrlsController < ApplicationController\n  def create\n    @url = Url.create!(url_params)\n    Url.encode(@url.id)\n  end\n  private\n  def url_params\n    params.require(:url).permit(:original_url)\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class Url < ActiveRecord::Base
                def self.create!(h); u = new; u.id = 1; u; end
                def self.encode(id); 'b'; end
              end
              c = UrlsController.new
              c.params = { url: { original_url: 'https://ruby.org' } }
              c.create == 'b'
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which controller action handles POST form submissions to create new database records?",
          options: ["create", "new", "post", "save"],
          correct: 0,
          rationale: "The <code>create</code> RESTful action handles record creation during POST requests."
        }
      },
      {
        stageNumber: 4,
        title: "4. Redirect & Clicks Counter",
        prompt: "Implement short URL redirection and analytics counter. In <code>app/controllers/urls_controller.rb</code>, write <code>show</code> action finding <code>Url</code>, incrementing <code>clicks</code>, and redirecting.",
        initialCode: {
          "app/controllers/urls_controller.rb": "class UrlsController < ApplicationController\n  # Implement show action with clicks counter and redirect:\nend"
        },
        hint: "@url.increment!(:clicks)\nredirect_to @url.original_url, allow_other_host: true",
        solution: "class UrlsController < ApplicationController\n  def show\n    @url = Url.find(params[:id])\n    @url.increment!(:clicks)\n    redirect_to @url.original_url, allow_other_host: true\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class Url < ActiveRecord::Base
                attr_accessor :clicks, :original_url
                def self.find(id); u = new; u.clicks = 0; u.original_url = 'https://ruby.org'; u; end
                def increment!(attr); self.clicks += 1; end
              end
              c = UrlsController.new
              c.params = { id: 1 }
              c.show
              c.instance_variable_get(:@url).clicks == 1
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which ActiveRecord method increments an integer column and commits it directly to the database?",
          options: ["increment!", "add_one", "update_count", "plus!"],
          correct: 0,
          rationale: "<code>increment!(:column)</code> increments an attribute counter and immediately executes a database update query."
        }
      },
      {
        stageNumber: 5,
        title: "5. QR Code Generator Service",
        prompt: "Build service <code>QrService</code> in <code>app/services/qr_service.rb</code> with method <code>self.generate(url)</code> returning SVG string template for URL.",
        initialCode: {
          "app/services/qr_service.rb": "class QrService\n  def self.generate(url)\n    # Generate SVG template string for url:\n  end\nend"
        },
        hint: "\"<svg>#{url}</svg>\"",
        solution: "class QrService\n  def self.generate(url)\n    \"<svg>#{url}</svg>\"\n  end\nend",
        validate: async () => {
          try {
            const svg = window.rubyVM.eval("QrService.generate('http://t.co/a')").toString();
            return svg.includes("<svg>") && svg.includes("http://t.co/a");
          } catch(e) { return false; }
        },
        quiz: {
          question: "What directory in Rails applications houses standalone domain services and utility objects?",
          options: ["app/services", "app/utilities", "lib/services", "app/domain"],
          correct: 0,
          rationale: "The <code>app/services</code> directory is standard for domain Service Objects in Rails applications."
        }
      }
    ]
  },
  {
    id: "scraper",
    title: "Build a Web Scraper in Rails",
    difficulty: "Beginner",
    duration: "2h 17m",
    unlockedAtStep: 133,
    description: "Write Nokogiri scrapers to parse target pages, schedule background monitoring tasks, and visualize results on dashboards.",
    stages: [
      {
        stageNumber: 1,
        title: "1. ScrapeTarget Model Validations",
        prompt: "Create <code>ScrapeTarget</code> model in <code>app/models/scrape_target.rb</code> validating <code>url</code> presence.",
        initialCode: {
          "app/models/scrape_target.rb": "class ScrapeTarget < ActiveRecord::Base\n  # Add url presence validation:\nend"
        },
        hint: "validates :url, presence: true",
        solution: "class ScrapeTarget < ActiveRecord::Base\n  validates :url, presence: true\nend",
        validate: async () => {
          try {
            const testCode = `
              s = ScrapeTarget.new
              v1 = s.valid? rescue true
              s.url = 'https://example.com'
              v2 = s.valid? rescue false
              !v1 && v2
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which validation requires fields to not be nil or blank?",
          options: ["presence", "required", "filled", "exists"],
          correct: 0,
          rationale: "<code>validates :attr, presence: true</code> ensures fields are present."
        }
      },
      {
        stageNumber: 2,
        title: "2. Parsing HTML with Nokogiri",
        prompt: "Define class <code>Scraper</code> in <code>app/services/scraper.rb</code> with method <code>parse_title(html)</code> that parses HTML text using Nokogiri, finds <code>&lt;h1&gt;</code> element, and returns stripped text.",
        initialCode: {
          "app/services/scraper.rb": "require 'nokogiri'\nclass Scraper\n  def self.parse_title(html)\n    # Parse and return stripped h1 text:\n  end\nend"
        },
        hint: "doc = Nokogiri::HTML(html)\ndoc.at_css('h1').text.strip",
        solution: "require 'nokogiri'\nclass Scraper\n  def self.parse_title(html)\n    doc = Nokogiri::HTML(html)\n    doc.at_css('h1').text.strip\n  end\nend",
        validate: async () => {
          try {
            const html = "<html><body><h1>  Parsed Heading  </h1></body></html>";
            const res = window.rubyVM.eval(`Scraper.parse_title(${JSON.stringify(html)})`).toString();
            return res === "Parsed Heading";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which Nokogiri method returns the first matching node for a CSS selector?",
          options: ["css", "at_css", "search", "xpath"],
          correct: 1,
          rationale: "<code>at_css</code> returns only the first matching element, whereas <code>css</code> returns a nodeset of all matching elements."
        }
      },
      {
        stageNumber: 3,
        title: "3. Background Scraping Worker",
        prompt: "Create ActiveJob <code>ScrapeJob < ActiveJob::Base</code> in <code>app/jobs/scrape_job.rb</code> with action <code>perform(url)</code> that logs scraping status message.",
        initialCode: {
          "app/jobs/scrape_job.rb": "class ScrapeJob < ActiveJob::Base\n  def perform(url)\n    # Perform background scrape:\n  end\nend"
        },
        hint: "puts \"Scraped: #{url}\"",
        solution: "class ScrapeJob < ActiveJob::Base\n  def perform(url)\n    puts \"Scraped: #{url}\"\n  end\nend",
        validate: async () => {
          try {
            window.rubyVM.eval("ScrapeJob.perform_later('https://example.com')");
            const jobs = window.rubyVM.eval("$background_jobs").toJS();
            return jobs.any(j => j.job === "ScrapeJob");
          } catch(e) { return false; }
        },
        quiz: {
          question: "Why should web scraping logic run inside background jobs?",
          options: ["To avoid blocking web server request threads during network delays", "To encrypt target HTML pages", "To run in offline mode", "To minify CSS assets"],
          correct: 0,
          rationale: "Network requests to external sites can be slow; running scrapers in background jobs keeps HTTP servers responsive."
        }
      },
      {
        stageNumber: 4,
        title: "4. Scrape Results Controller",
        prompt: "Build <code>ScrapesController</code> in <code>app/controllers/scrapes_controller.rb</code> with action <code>create</code> enqueuing <code>ScrapeJob.perform_later(params[:url])</code> and returning message <code>'Enqueued'</code>.",
        initialCode: {
          "app/controllers/scrapes_controller.rb": "class ScrapesController < ApplicationController\n  # Implement create action enqueuing ScrapeJob:\nend"
        },
        hint: "def create\n  ScrapeJob.perform_later(params[:url])\n  'Enqueued'\nend",
        solution: "class ScrapesController < ApplicationController\n  def create\n    ScrapeJob.perform_later(params[:url])\n    'Enqueued'\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              c = ScrapesController.new
              c.params = { url: 'http://test.org' }
              c.create == 'Enqueued'
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which method delegates job processing asynchronously to ActiveJob worker backends?",
          options: ["perform_later", "perform_now", "enqueue_now", "start_worker"],
          correct: 0,
          rationale: "<code>perform_later</code> enqueues tasks asynchronously to worker pools."
        }
      },
      {
        stageNumber: 5,
        title: "5. Scheduled Periodic Monitor",
        prompt: "Schedule periodic scraping check. Write class method <code>self.schedule_all</code> on <code>ScrapeTarget</code> in <code>app/models/scrape_target.rb</code> iterating target URLs and calling <code>ScrapeJob.perform_later(target.url)</code>.",
        initialCode: {
          "app/models/scrape_target.rb": "class ScrapeTarget < ActiveRecord::Base\n  # Add self.schedule_all method:\nend"
        },
        hint: "def self.schedule_all\n  all.each { |t| ScrapeJob.perform_later(t.url) }\nend",
        solution: "class ScrapeTarget < ActiveRecord::Base\n  def self.schedule_all\n    all.each { |t| ScrapeJob.perform_later(t.url) }\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class << ScrapeTarget
                def all; [Struct.new(:url).new('http://a.com')]; end
              end
              ScrapeTarget.schedule_all rescue nil
              true
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which Ruby collection method iterates over elements executing a block?",
          options: ["each", "loop", "walk", "traverse"],
          correct: 0,
          rationale: "The <code>each</code> iterator executes a block for every item in arrays or ActiveRecord collections."
        }
      }
    ]
  },
  {
    id: "whisper",
    title: "OpenAI Whisper Transcriber",
    difficulty: "Intermediate",
    duration: "1h 58m",
    unlockedAtStep: 160,
    description: "Build an automated transcription service scheduling ActiveJob workers to process incoming audio streams via Whisper.",
    stages: [
      {
        stageNumber: 1,
        title: "1. Recording Model & File Attachments",
        prompt: "In <code>app/models/recording.rb</code>, create <code>Recording</code> model with attachment <code>has_one_attached :audio</code>.",
        initialCode: {
          "app/models/recording.rb": "class Recording < ActiveRecord::Base\n  # Add audio attachment:\nend"
        },
        hint: "has_one_attached :audio",
        solution: "class Recording < ActiveRecord::Base\n  has_one_attached :audio\nend",
        validate: async () => {
          try {
            const testCode = `
              Recording.ancestors.include?(ActiveRecord::Base)
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which ActiveStorage helper attaches a single file to a model?",
          options: ["has_one_attached", "has_many_attached", "attach_file", "has_file"],
          correct: 0,
          rationale: "<code>has_one_attached</code> attaches single uploaded files to model records."
        }
      },
      {
        stageNumber: 2,
        title: "2. Background Transcription Job",
        prompt: "Create ActiveJob class <code>TranscribeJob</code> in <code>app/jobs/transcribe_job.rb</code>. Implement <code>perform(audio_url)</code> method logging transcription process.",
        initialCode: {
          "app/jobs/transcribe_job.rb": "class TranscribeJob < ActiveJob::Base\n  def perform(audio_url)\n    # Output transcription performance message:\n  end\nend"
        },
        hint: "puts \"Transcribed: #{audio_url}\"",
        solution: "class TranscribeJob < ActiveJob::Base\n  def perform(audio_url)\n    puts \"Transcribed: #{audio_url}\"\n  end\nend",
        validate: async () => {
          try {
            window.rubyVM.eval("TranscribeJob.perform_later('http://media.org/aud.mp3')");
            const jobs = window.rubyVM.eval("$background_jobs").toJS();
            return jobs.any(j => j.job === "TranscribeJob" && j.args.includes("http://media.org/aud.mp3"));
          } catch(e) { return false; }
        },
        quiz: {
          question: "What is ActiveJob in Rails?",
          options: ["A database connector", "A unified framework for declaring and scheduling background worker queues", "A background compilation driver", "A thread supervisor"],
          correct: 1,
          rationale: "ActiveJob provides a common wrapper interface to run background tasks with different queue adapters (e.g. Sidekiq, Solid Queue)."
        }
      },
      {
        stageNumber: 3,
        title: "3. Status Callback Update",
        prompt: "Update transcription state when audio processing completes. In <code>app/jobs/transcribe_job.rb</code>, update <code>Recording</code> status to <code>'completed'</code> upon performance finish.",
        initialCode: {
          "app/jobs/transcribe_job.rb": "class TranscribeJob < ActiveJob::Base\n  def perform(recording_id, transcript_text)\n    # Update Recording record status and text:\n  end\nend"
        },
        hint: "rec = Recording.find(recording_id)\nrec.update!(status: 'completed', transcript: transcript_text)",
        solution: "class TranscribeJob < ActiveJob::Base\n  def perform(recording_id, transcript_text)\n    rec = Recording.find(recording_id)\n    rec.update!(status: 'completed', transcript: transcript_text)\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class Recording < ActiveRecord::Base
                attr_accessor :status, :transcript
                def self.find(id); r = new; r; end
                def update!(hash); hash.each { |k, v| send("#{k}=", v) }; end
              end
              j = TranscribeJob.new
              j.perform(1, 'Hello world') rescue nil
              true
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which ActiveRecord method updates model attributes and immediately commits changes to the database?",
          options: ["update!", "set_attributes", "save_later", "write_column"],
          correct: 0,
          rationale: "<code>update!(hash)</code> sets attribute values and saves the record in a single operation, raising errors if validation fails."
        }
      },
      {
        stageNumber: 4,
        title: "4. Recordings Controller Transcribe Action",
        prompt: "In <code>app/controllers/recordings_controller.rb</code>, implement <code>create</code> action creating <code>Recording</code> record and calling <code>TranscribeJob.perform_later(rec.id, 'Sample transcript')</code>.",
        initialCode: {
          "app/controllers/recordings_controller.rb": "class RecordingsController < ApplicationController\n  # Implement create action:\nend"
        },
        hint: "rec = Recording.create!(recording_params)\nTranscribeJob.perform_later(rec.id, 'Sample transcript')",
        solution: "class RecordingsController < ApplicationController\n  def create\n    rec = Recording.create!(recording_params)\n    TranscribeJob.perform_later(rec.id, 'Sample transcript')\n    'Created'\n  end\n  private\n  def recording_params\n    params.require(:recording).permit(:title)\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class Recording < ActiveRecord::Base
                def self.create!(h); r = new; r.id = 1; r; end
              end
              c = RecordingsController.new
              c.params = { recording: { title: 'Test' } }
              c.create == 'Created'
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Why do we trigger background processing jobs inside controller actions?",
          options: ["To return fast responses to HTTP clients while long tasks run asynchronously", "To validate database schemas", "To format ERB templates", "To encrypt session tokens"],
          correct: 0,
          rationale: "Triggering jobs in controller actions offloads heavy work, returning instant responses to users."
        }
      },
      {
        stageNumber: 5,
        title: "5. Notification Mailer Delivery",
        prompt: "Notify user when transcription finishes. In <code>app/mailers/transcript_mailer.rb</code>, build class method <code>send_transcript(user_email, text)</code> calling <code>mail(to: user_email, subject: 'Transcript Ready', body: text)</code>.",
        initialCode: {
          "app/mailers/transcript_mailer.rb": "class TranscriptMailer < ActionMailer::Base\n  # Implement send_transcript mailer:\nend"
        },
        hint: "def self.send_transcript(user_email, text)\n  mail(to: user_email, subject: 'Transcript Ready', body: text)\nend",
        solution: "class TranscriptMailer < ActionMailer::Base\n  def self.send_transcript(user_email, text)\n    mail(to: user_email, subject: 'Transcript Ready', body: text)\n  end\nend",
        validate: async () => {
          try {
            window.rubyVM.eval("TranscriptMailer.send_transcript('u@t.com', 'Body text')");
            const emails = window.rubyVM.eval("$sent_emails").toJS();
            return emails.any(e => e.to === "u@t.com");
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which ActionMailer method sends an email message?",
          options: ["mail", "send_email", "deliver", "smtp_send"],
          correct: 0,
          rationale: "The <code>mail(options)</code> helper constructs and delivers email messages in ActionMailer."
        }
      }
    ]
  },
  {
    id: "saas",
    title: "Domain SaaS Product",
    difficulty: "Intermediate",
    duration: "4h 06m",
    unlockedAtStep: 168,
    description: "Develop a complete subscription-based SaaS product featuring Stripe webhooks, task scheduling, and custom admin authorizations.",
    stages: [
      {
        stageNumber: 1,
        title: "1. Account & Plan Models",
        prompt: "In <code>app/models/account.rb</code>, create <code>Account</code> model with association <code>has_many :users</code> and <code>has_many :projects</code>.",
        initialCode: {
          "app/models/account.rb": "class Account < ActiveRecord::Base\n  # Associations:\nend"
        },
        hint: "has_many :users\nhas_many :projects",
        solution: "class Account < ActiveRecord::Base\n  has_many :users\n  has_many :projects\nend",
        validate: async () => {
          try {
            const testCode = `
              Account.associations.key?(:users) && Account.associations.key?(:projects)
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which association macro defines a one-to-many relationship from Account to Projects?",
          options: ["has_many", "belongs_to", "has_one", "connects_to"],
          correct: 0,
          rationale: "<code>has_many</code> specifies a one-to-many relationship."
        }
      },
      {
        stageNumber: 2,
        title: "2. Usage Quota Validations",
        prompt: "Enforce SaaS plan limits. In <code>app/models/account.rb</code>, write custom validation method <code>validate_project_quota</code> preventing project creation if <code>projects.count >= plan_limit</code>.",
        initialCode: {
          "app/models/account.rb": "class Account < ActiveRecord::Base\n  # Add custom validation for project limits:\nend"
        },
        hint: "validate :validate_project_quota\ndef validate_project_quota\n  errors.add(:base, 'Quota exceeded') if projects.count >= plan_limit\nend",
        solution: "class Account < ActiveRecord::Base\n  validate :validate_project_quota\n  def validate_project_quota\n    errors.add(:base, 'Quota exceeded') if projects.count >= plan_limit\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class Account < ActiveRecord::Base
                attr_accessor :plan_limit, :projects, :errors
                def initialize; @errors = []; end
                def validate_project_quota
                  @errors << 'Quota exceeded' if @projects.count >= @plan_limit
                end
              end
              a = Account.new
              a.plan_limit = 2
              a.projects = [1, 2]
              a.validate_project_quota
              a.errors.include?('Quota exceeded')
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which model macro registers a custom validation method?",
          options: ["validate", "validates", "custom_validation", "check_with"],
          correct: 0,
          rationale: "The <code>validate :method_name</code> macro registers custom validation methods on ActiveRecord models."
        }
      },
      {
        stageNumber: 3,
        title: "3. Admin Authorization Callback",
        prompt: "Ensure security in admin panels. Create controller callback filter <code>require_admin</code> in <code>app/controllers/admin_controller.rb</code>. If <code>current_user.admin?</code> is false, raise StandardError with message 'Unauthorized'.",
        initialCode: {
          "app/controllers/admin_controller.rb": "class AdminController < ApplicationController\n  # Implement require_admin filter check:\nend"
        },
        hint: "def require_admin\n  raise StandardError, 'Unauthorized' unless current_user.admin?\nend",
        solution: "class AdminController < ApplicationController\n  def require_admin\n    raise StandardError, 'Unauthorized' unless current_user.admin?\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class UserMock
                def admin?; false; end
              end
              c = AdminController.new
              class << c
                attr_accessor :current_user
              end
              c.current_user = UserMock.new
              begin
                c.require_admin
                false
              rescue StandardError => e
                e.message == 'Unauthorized'
              end
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Which controller callback hook is appropriate for checking user authorization before actions are run?",
          options: ["after_action", "before_action", "around_action", "secure_action"],
          correct: 1,
          rationale: "<code>before_action</code> filters run before actions, making them ideal to verify permissions and redirect unauthorized users."
        }
      },
      {
        stageNumber: 4,
        title: "4. Webhook Event Handler",
        prompt: "Handle Stripe webhooks. In <code>app/controllers/webhooks_controller.rb</code>, write <code>receive</code> action processing event payload. If <code>params[:type] == 'customer.subscription.deleted'</code>, set account <code>status = 'canceled'</code>.",
        initialCode: {
          "app/controllers/webhooks_controller.rb": "class WebhooksController < ApplicationController\n  # Implement receive webhook action:\nend"
        },
        hint: "def receive\n  if params[:type] == 'customer.subscription.deleted'\n    Account.find(params[:account_id]).update!(status: 'canceled')\n  end\nend",
        solution: "class WebhooksController < ApplicationController\n  def receive\n    if params[:type] == 'customer.subscription.deleted'\n      Account.find(params[:account_id]).update!(status: 'canceled')\n      'Handled'\n    end\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class Account < ActiveRecord::Base
                def self.find(id); a = new; a; end
                def update!(h); true; end
              end
              c = WebhooksController.new
              c.params = { type: 'customer.subscription.deleted', account_id: 1 }
              c.receive == 'Handled'
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "What are HTTP Webhooks used for in web applications?",
          options: ["Receiving automated HTTP POST callbacks from external services when events occur", "Compressing image uploads", "Serving static CSS stylesheets", "Debugging Ruby syntax"],
          correct: 0,
          rationale: "Webhooks allow external services (like Stripe) to notify your server of events (like subscription cancellations) in real time."
        }
      },
      {
        stageNumber: 5,
        title: "5. Billing Downgrade Service",
        prompt: "Build service <code>DowngradeService</code> in <code>app/services/downgrade_service.rb</code> with method <code>self.process(account)</code> updating <code>account.plan = 'free'</code> and sending notification email.",
        initialCode: {
          "app/services/downgrade_service.rb": "class DowngradeService\n  def self.process(account)\n    # Update plan and send email:\n  end\nend"
        },
        hint: "account.update!(plan: 'free')\nAccountMailer.downgrade_notice(account.email).deliver_later",
        solution: "class DowngradeService\n  def self.process(account)\n    account.update!(plan: 'free')\n    'Processed'\n  end\nend",
        validate: async () => {
          try {
            const testCode = `
              class AccountMock
                def update!(h); true; end
              end
              DowngradeService.process(AccountMock.new) == 'Processed'
            `;
            return window.rubyVM.eval(testCode).toString() === "true";
          } catch(e) { return false; }
        },
        quiz: {
          question: "Why decouple complex business workflows into dedicated Service Objects?",
          options: ["To keep controller actions lean, readable, and focused on HTTP concerns", "To speed up database connections", "To automatically format HTML templates", "To enable WebSockets"],
          correct: 0,
          rationale: "Service Objects encapsulate complex business logic outside of controllers and models, keeping the codebase clean and testable."
        }
      }
    ]
  }
];

// Export to window object for browser access
window.projectsData = projectsData;
