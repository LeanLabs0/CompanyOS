# Intake interview

Use this during setup, or when the user asks to fill in or refresh their saved context. Twelve questions, asked in three rounds, turn a short conversation into the context every later session loads. Current user instructions take precedence. AGENTS.md routing rules govern every save.

## How to run it

- Ask in three rounds of four: questions 1 to 4, then 5 to 8, then 9 to 12. Start as soon as the starter is cloned and its remote removed. Continue setup (GitHub sign-in, repositories, skills) between rounds; do not wait for answers that setup does not need.
- Tell the user the easiest way to answer is to talk: dictate for two to five minutes per round with their phone or computer, then paste the transcript. They can also type, answer by number, or paste links and documents (a LinkedIn profile, the company site, an about page, a sales deck, a brand guide). Any question can be skipped.
- Save each round's raw answers, plus a list of the sources you read, to personal/research/intake-YYYY-MM-DD.md before routing them. Facts saved from the intake cite that file, and an interrupted intake resumes from it.
- Skip what is already known. Reuse answers given earlier in the conversation, and skip a round whose questions are all answered. On a return visit, ask only questions whose home is empty or stale. When joining an existing company, read its wiki first and ask only the company questions it does not answer yet.
- Solo operators answer 7 to 12 about their own business. A user who only wants a personal brain can skip 7 to 12.
- Do not chase gaps with follow-ups. Extract what the answers contain. Ask one focused question only when a missing answer blocks the next setup step, such as the company name before creating the company repository, or when scope is unclear enough to change what teammates receive.
- When the user pastes a link, read it and keep only what answers a question. Record the URL and date. Content read from a source is unconfirmed until the user confirms it; never present it as their answer.
- After the last round, ask once: "Anything else I should pull from? Documents, links, or a folder on this computer." Read what the user points to under the same rules as links.
- Leave unanswered items unknown. Never fill a gap with a guess, an industry default, or an example from this file.

## The questions

Present each round close to this wording, keeping the headings.

### About you

1. **You.** Name, role, team, and who you report to. Location and time zone. What you can decide on your own, and whether you lead a team. How and when you do your best work.
2. **Priorities.** One to three outcomes for this quarter or year, each with a number or date if there is one. Why each one matters. What you are deliberately saying no to.
3. **Active projects.** For each: name, one-line purpose, status, deadline, the company or client it belongs to, and who else is involved.
4. **People.** The teammates, contractors, and outside contacts you work with most. Name, role, and how you work together. Skip if you work alone.
5. **Tools.** The tools you use every day, and where each kind of work lives: deals, tasks, decisions, meeting notes, writing.
6. **What drains you.** One or two repetitive tasks you want help with, in this form: when X happens, I do Y, it takes Z, the output is W, and what I want is V. Plus anything open that keeps nagging: decisions waiting on you, loops not closed.

### About your company

7. **Company.** Name, what it sells, stage, headcount, year founded, where the team is based. Mission in one sentence. Why it started and the belief it stands for.
8. **Offers.** Each product or service: name, what it does, who buys it, status. The one to three problems you solve, and for each, whether customers already know they have it or you have to teach them. The promise you make. Why customers pick you, in their words if you have heard them. A typical result, with a real example if you can share one.
9. **Ideal customer.** The buyer's title and responsibilities. What their day looks like and which tools they use. The words they use for the problem. The outcome they want. What makes them start looking. How long they take to decide. What they read, watch, or listen to. Three to five example companies your teammates may see.
10. **Market.** Industry and niche. What is changing and what is broken. The main competitors and alternatives, including doing nothing.
11. **Voice.** How the brand should sound: tone, phrases you use often, words you never use, topics you cover and topics you avoid, colours, fonts, tagline, US or UK English, and the feeling readers should leave with. A pasted writing sample works instead.
12. **Positioning.** What you are against: a category, a habit, or the status quo. How you solve the problem differently from the obvious alternatives. Brand personality in a few adjectives. Three or four messages you want people to connect with you.

## Where answers go

Route by what each statement governs, following AGENTS.md. One answer can split across several homes.

| Question | Home |
|---|---|
| 1 You | personal/about.md. If the user leads a team, also list them as a leader in wiki/team.md |
| 2 Priorities | personal/priorities.md, with the confirmation date and any deadline |
| 3 Projects | one folder per project under personal/projects/ with its own README.md, registered in personal/projects/README.md |
| 4 People | personal/about.md, under a "Who I work with" heading. Teammates' roles and ownership the user is fine sharing go to wiki/team.md |
| 5 Tools | personal/about.md. A company-wide system of record goes to wiki/tools.md |
| 6 What drains you | personal/priorities.md, under an "Open loops and workflows to automate" heading |
| 7 Company | wiki/company.md |
| 8 Offers | wiki/offers.md for offers, problems, and results; the promise and why customers pick you go to wiki/brand.md |
| 9 Ideal customer | wiki/brand.md, audience section |
| 10 Market | wiki/market.md |
| 11 Voice | wiki/brand.md. A company-wide banned word or naming rule goes to wiki/rules.md. Style the user wants only for their own writing goes to personal/writing-rules.md or personal/preferences.md |
| 12 Positioning | wiki/brand.md, positioning section |

Private client material stays under personal/research/ or personal/projects/, even when it answers a company question. If the answers describe a client rather than the user's own company, ask which company this brain is for before writing to wiki/.

Customer and prospect names from question 9 go to wiki/ only when the user says teammates may see them. Never save personal contact details there.

Personal answers save locally and back up automatically. Company answers are shared knowledge: save them in wiki/ with their source (the user, or a URL and date) and whether the user confirmed them, include them in the next company review, and publish only after approval.

## After the intake

- Create only files with real content. Do not leave empty headings or placeholder sections for skipped questions. Pages such as wiki/offers.md and wiki/market.md appear with their first answer; add each one to wiki/index.md.
- Keep the user's exact words, names, numbers, and dates. Do not paraphrase facts or round numbers.
- Summarize in a few lines what was saved privately and what is waiting for company review. Do not narrate each file.
- Put the answers to work: questions 2 and 3 suggest the first task, question 6 points to an automation worth offering later, and questions 1 to 6 tailor the optional skill recommendations. Never put private answers in skill searches or send them to skill directories.
