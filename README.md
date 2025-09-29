# group-projects-team7
group-projects-team7 created by GitHub Classroom
Project Overview
YourOwn is a platform designed to simplify and enrich the process of building personal portfolios. Unlike existing open-source templates, which often feel tedious to customize, unappealing, and require technical depth, YourOwn emphasizes user experience. When users enter the platform, they are guided through reflection-based questions that help them describe their experience in a structured and meaningful way. Each experience can then be formatted with templates, previewed as part of a full portfolio, and then exported as a ZIP file or Github Repository.
To take a step further, YourOwn provides an optional tool that automatically sets up the user's AWS account with the correct S3 and load balancer configuration, allowing users to host their portfolio on their own cloud domain at minimal to no cost. This removes the barrier of technical setup while keeping true ownership in the hands of the user. There is no vendor lock-in; instead, users walk away with a portfolio they fully control. We only add a subtle watermark to signify it was created through YourOwn. 
Our development will follow a plan-driven approach. This is because YourOwn requires building a structured, end to end workflow for user onboarding, portfolio generation, and optional AWS deployment. These sets of components must be carefully designed up front to avoid misalignment and rework. A clear, sequential plan allows us to map each feature and dependent in advance, allowing us to match our intended user experience. 


Stakeholders 
Students
Main Priority: Find a fast, but easy way to present their skills, abilities, and accomplishments into an elegant and clear portfolio.
Sub Priorities:
The portfolio can be easily updated.
The portfolio includes advanced options (not just doing the “bare minimum”):
Examples: Deeper learning curve in coding the portfolio, option to not let “AI” dictate what you should do, supports more advanced-level code, etc.
The GUI and UI of the portfolio maker is readable and easy to navigate through.
Sending links and uploading files to media or others doesn’t cause problems (in other words, it’s straightforward to perform).
The ability to save others’ portfolios (and see it for future reference).

Student Organizations
Main Priority: Find an efficient method to display information about their organizations.
Sub Priorities:
Easy access to learn more about their organization (i.e., QR-codes, link to website).
An option to track who visited the website (this allows for the org to get a rough idea who’s interested).

Requirements Elicitation
How We Will Gather Requirements
To gather requirements for YourOwn, we will use a combination of the following methods:
User Interviews: Conduct one-on-one sessions to understand their needs and frustrations with current portfolio tools.
Brainstorming Sessions: Internal team discussions to explore creative solutions and prioritize features.
Competitive Analysis: Review existing portfolio platforms and open-source templates to identify gaps and opportunities.
Draft Questionnaire
Here are five sample questions we would ask during interviews or surveys:
What challenges have you faced when creating a personal portfolio?
How important is visual customization (e.g., templates, layout) in your portfolio?
Would you prefer a guided experience or full control when entering your portfolio content? Why?
Do you have experience with cloud hosting (e.g., AWS)? Would you use an automated tool to publish your portfolio?
What features would make you feel confident that your portfolio truly represents you?
How We Will Organize Requirements
We will categorize requirements into the following groups:
Client-Server Interactions:
 Covers user-facing features such as sign-up, dashboard, content input, template selection, and live preview.
Exporting Tool:
 Includes functionality for generating and downloading the portfolio as a ZIP file or GitHub repository.
Automation Tool:
 Encompasses the optional AWS deployment tool, including S3 setup, load balancer configuration, and domain routing.


Requirements Specification

Functional 
FR-01 Sign up & Sign in 
Goal: The system shall let users create an account to store their progress
Acceptance:
Users can sign up with email/password or OAuth using third-party accounts (Google preferably)
Password reset
After sign in, they land on their dashboard

FR-02 Create and Manage a Portfolio Project 
Goal: The system shall allow to start a portfolio, rename it, and delete it
Acceptance: 
“New portfolio” button creates a blank project 
Users can rename or delete a project from the dashboard 
Multiple Portfolios won't be in MVP but to be considered 
Multiple portfolios could be a premium 

FR-03 Dashboard page 
Goal: Shows all necessary items in this dashboard page.
Acceptance
“New Portfolio” button to create a blank project.
Show Portfolio (After MVP, we will show all portfolios. MVP will only support 1 per user) and have an edit and delete button for portfolios.
1-2 minute click through tutorial for new users
Settings page to update/change personal information

FR-04 Add Experiences (Content input)
Goal: CRUD experience entries (role, org, dates, bullets, etc.) 
Acceptance: 
Form lets users add multiple experiences
Users can reorder experience 
Drag and drop (?) 
Changes are saved automatically 

FR-05 YourOwn watermark 
Goal: create a paywall for removing our watermark
Acceptance: 
Watermark stays in a discreet area of the portfolio to advertise YourOwn
Users can pay to remove the watermark

FR-0 Upload Media
Goal: add project images and profile photos
Acceptance:
Users can upload images from their device 
Large or unsupported file show a friendly error

FR-0  Upload links
Goal: users are allowed to upload links of their socials and any other external sites 
Acceptance:
Links are embedded in assets for better UI 
Users can CRUD links after portfolio is done 
Their local dev allows them to do that

FR-05 Choose a template for experience 
Goal: The system shall allow user to pick 1-2 templates 
Acceptance:
Template picker shows screenshots 
Selected template updates the preview
 
FR-06 Live Preview 
Goal: The system shall show how portfolio will look like without delivering full code 
Acceptance: 
Preview shows at the end of process 
Preview shows correct content with template 

FR-07 Export a ZIP
Goal: The system shall allow user to download a working website (HTML/CSS/Assets) as a zip 
Acceptance:
“Export” Creates a downloadable zip

FR-08 Automate publishing template in AWS 
Goal: The system shall have a tool to setup a users aws account to publish portfolio 
Acceptance:
Tool should be optional for users 
No security issues handling users aws account 
Successfully adds S3 configs 
Successfully adds ELB configs
Successfully adds route 66 configs for domain name
Non-Functional 
NFR-01 Easy Sign-Up
Intent: Keep account creation painless.
Acceptance:
Sign-up takes ≤ 1 minute for a new user.
No more than 2 screens (email/password → confirm).
Clear reasons shown if sign-up fails.


NFR-02 Clarity & Simplicity in experience creation 
Intent: adding an experience should feel natural.
Acceptance:
Plain language labels (no jargon).
Each screen has one clear primary
No part of the process should feel   unnecessary to the user
First-time users can create a portfolio and add one experience in ≤ 10 minutes.


NFR-03 Responsiveness (Perceived Speed)
Intent: Feels snappy on normal internet.
Acceptance:
Preview updates within ~½ second after an edit.
Export completes within a short, reasonable time for small portfolios (e.g., under ~10 seconds).
Loading states or progress bars appear when needed.

Requirements Validation
We will validate requirements through building wireframes and mock workflows to check usability and getting feedback from early users.

Functional Requirements
FR-01: Sign up & Sign in
Verifiability: Yes, can test by creating accounts, logging in, resetting passwords.
Comprehensibility: Clear—requirements specify flows and outcomes.
Traceability: Originates from core need to store user progress.
Adaptability: Can add more sign-in methods or 2FA later.
FR-02: Create and Manage a Portfolio Project
Verifiability: Test with new, rename, delete actions.
Comprehensibility: Straightforward, includes MVP scope.
Traceability: Comes from user need to manage portfolios.
Adaptability: Scales to multiple portfolios or premium tier.
FR-03: Dashboard page
Verifiability: Test visibility of portfolio items, tutorial, settings.
Comprehensibility: Clear features listed.
Traceability: From usability needs.
Adaptability: Dashboard can evolve to support new features.
FR-04: Add Experiences (Content input)
Verifiability: Test CRUD operations and reordering.
Comprehensibility: Explicit fields and actions make it clear.
Traceability: Derived from portfolio content creation need.
Adaptability: Can extend with richer input types later.
FR-05: YourOwn watermark
Verifiability: Can test watermark visibility and payment removal.
Comprehensibility: Clear paywall logic.
Traceability: Businesses need to monetize.
Adaptability: Could expand to subscription tiers.
FR-0: Upload Media
Verifiability: Test file upload success and error cases.
Comprehensibility: Clear acceptance criteria.
Traceability: From user need for visuals.
Adaptability: Extendable to video or cloud integrations.
FR-0: Upload Links
Verifiability: Test CRUD links and embedding.
Comprehensibility: Clear.
Traceability: From need to show external presence.
Adaptability: Could support custom icons or analytics.
FR-05: Choose a template
Verifiability: Test template selection and preview change.
Comprehensibility: Clear and simple.
Traceability: From design customization needs.
Adaptability: Can add more templates later.
FR-06: Live Preview
Verifiability: Test preview correctness and responsiveness.
Comprehensibility: Clear “without delivering full code.”
Traceability: From user need for feedback before publishing.
Adaptability: Could expand to real-time previews.
FR-07: Export a ZIP
Verifiability: Test by downloading and running the portfolio.
Comprehensibility: Straightforward.
Traceability: From requirement for usable output.
Adaptability: Could support GitHub Pages or Netlify export.
FR-08: Automate publishing template in AWS
Verifiability: Test AWS setup success (S3, ELB, Route 66).
Comprehensibility: Some complexity, but clear.
Traceability: From deployment convenience goal.
Adaptability: Could later add support for Azure or GCP.



Non-Functional Requirements
NFR-01: Easy Sign-Up
Verifiability: Test sign-up duration and failure messages.
Comprehensibility: Clear time and step limits.
Traceability: From UX design goals.
Adaptability: Can be adjusted for new flows like social login.
NFR-02: Clarity & Simplicity in Experience Creation
Verifiability: Usability testing, measuring time to add experience.
Comprehensibility: Clear plain-language requirement.
Traceability: From UX needs.
Adaptability: Can be refined based on user testing feedback.
NFR-03: Responsiveness (Perceived Speed)
Verifiability: Test preview delay and export duration.
Comprehensibility: Clear quantitative measures.
Traceability: From performance goals.
Adaptability: Benchmarks can be adjusted as portfolio sizes grow.

