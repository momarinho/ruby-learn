// Projects Data definition for Rails Capstone Projects
const projectsData = [
  {
    id: "blog",
    title: "Build a Blog with Rails 7",
    difficulty: "Beginner",
    duration: "5h 17m",
    unlockedAtStep: 83,
    description: "Build a blog completely from scratch to learn routes, models, views, and controllers. Plus, add migrations, ActionText, and ActiveStorage uploads.",
    stages: [
      {
        stageNumber: 1,
        title: "1. Blog Routing Setup",
        prompt: "Configure the RESTful routes for the <code>articles</code> resource in <code>config/routes.rb</code> and set the root URL to point to the index action of our articles controller.",
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
        prompt: "Write a migration class <code>CreateArticles</code> in <code>db/migrate/create_articles.rb</code> to create a table named <code>articles</code> with <code>title</code> (string) and <code>body</code> (text) columns.",
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
        prompt: "Create the <code>Article</code> class in <code>app/models/article.rb</code>. Add validations requiring the <code>title</code> to be present, and requiring the <code>body</code> to be present with a minimum length of 10 characters.",
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
        title: "4. ActionText Rich Text",
        prompt: "Configure ActionText inside our Blog. Declare <code>has_rich_text :content</code> on model <code>Article</code>. Update the form partial <code>app/views/articles/_form.html.erb</code> to render <code>f.rich_text_area :content</code> instead of <code>:body</code>, and update controller params to permit <code>:content</code>.",
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
            const testParams = `
              class ParamsMock
                def initialize(h); @h = h; end
                def require(key); ParamsMock.new(@h[key]); end
                def permit(*args); @h.select { |k, v| args.include?(k) }; end
              end
              c = ArticlesController.new
              c.params = ParamsMock.new({ article: { title: 'T', content: 'Rich' } })
              c.send(:article_params).keys.include?(:content)
            `;
            const paramsOk = window.rubyVM.eval(testParams).toString() === "true";
            return formHtml.includes("rich_text_area") && paramsOk;
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
        stageNumber: 5,
        title: "5. ActiveStorage Image Uploads",
        prompt: "Blogs need cover images. Add attachment definition <code>has_one_attached :cover_image</code> inside model <code>Article</code>. Update form partial to include file field <code>f.file_field :cover_image</code>, and permit it in controller's <code>article_params</code>.",
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
            const testParams = `
              class ParamsMock
                def initialize(h); @h = h; end
                def require(key); ParamsMock.new(@h[key]); end
                def permit(*args); @h.select { |k, v| args.include?(k) }; end
              end
              c = ArticlesController.new
              c.params = ParamsMock.new({ article: { cover_image: 'file' } })
              c.send(:article_params).keys.include?(:cover_image)
            `;
            const paramsOk = window.rubyVM.eval(testParams).toString() === "true";
            return formHtml.includes("file_field") && paramsOk;
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
    duration: "2h 40m",
    unlockedAtStep: 95,
    description: "Securely encrypt user credentials with ActiveRecord Encryption, enable sharing via join tables with roles, and add Javascript clipboard helpers.",
    stages: [
      {
        stageNumber: 1,
        title: "1. Credentials Encryption",
        prompt: "Secure passwords in the database. Use <code>encrypts :password</code> inside <code>Credential</code> model in <code>app/models/credential.rb</code> so that ActiveRecord handles dynamic encryption.",
        initialCode: {
          "app/models/credential.rb": "class Credential < ActiveRecord::Base\n  # Add credential validations and database encryption:\nend"
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
        stageNumber: 2,
        title: "2. Joining Shares with Roles",
        prompt: "Build sharing permissions. In <code>app/models/share.rb</code>, declare a join model that <code>belongs_to :user</code>, <code>belongs_to :credential</code>, and validates presence of <code>role</code> (either 'viewer' or 'editor').",
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
      }
    ]
  },
  {
    id: "budget",
    title: "Budget Tracker SPA",
    difficulty: "Intermediate",
    duration: "2h 11m",
    unlockedAtStep: 108,
    description: "Strengthen your understanding of Hotwire (Turbo Frames, Streams) to build a budget tracker that feels like a single-page app.",
    stages: [
      {
        stageNumber: 1,
        title: "1. Turbo Frame Form Render",
        prompt: "Wrap transaction creation in a Turbo Frame. In <code>app/views/transactions/new.html.erb</code>, wrap your form inside <code>&lt;%= turbo_frame_tag 'new_transaction' do %&gt;...&lt;% end %&gt;</code>.",
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
        title: "1. Base62 Encoder Implementation",
        prompt: "Implement custom Base62 encoding in model <code>Url</code> at <code>app/models/url.rb</code>. Define a class method <code>self.encode(id)</code> that converts an integer ID to its corresponding string using character alphabet <code>a-z, A-Z, 0-9</code>.",
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
        title: "1. Parsing HTML with Nokogiri",
        prompt: "Define a class <code>Scraper</code> in <code>app/services/scraper.rb</code> with method <code>parse_title(html)</code> that parses HTML text using Nokogiri, finds the <code>&lt;h1&gt;</code> element, and returns its text content stripped of whitespace.",
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
        title: "1. Background Transcription Job",
        prompt: "Create an ActiveJob class <code>TranscribeJob</code> in <code>app/jobs/transcribe_job.rb</code> inheriting from <code>ActiveJob::Base</code>. Implement a <code>perform(audio_url)</code> method that simulates Whisper API processing and outputs transcripts log.",
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
      }
    ]
  },
  {
    id: "saas",
    title: "Domain SaaS Product",
    difficulty: "Intermediate",
    duration: "4h 6m",
    unlockedAtStep: 168,
    description: "Develop a complete subscription-based SaaS product featuring Stripe webhooks, scheduling tasks, and custom admin authorizations.",
    stages: [
      {
        stageNumber: 1,
        title: "1. Admin Authorization Callback",
        prompt: "Ensure security in admin panels. Create a controller callback filter <code>require_admin</code> in <code>app/controllers/admin_controller.rb</code>. If <code>current_user.admin?</code> is false, redirect to home page or raise StandardError.",
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
      }
    ]
  }
];

// Export to window object for browser access
window.projectsData = projectsData;
