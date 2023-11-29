# Planning
## What do we want out of this time?
We want to get to a point that has multiple users interacting. We want this to be a project where we all push ourselves and make a project that we are all proud of. 

## What hours do we want to keep?
Minimum 9-5. Most of us are going to be staying late most evenings, but there are no set expectations around this. During this time we will be sure to communicate with anyone who isnt in on that particular day. On the weekend, especially Sunday, we are keen to have a meeting to just make sure everyone is on the same page, and/or prepared for whats coming up in the next few days. 

## How will work be handled over the weekend?
* Tristan - Pretty much whenever, not too late. Probably 8+ hours each day. 
* Sean - ~5 hours on Saturday, ~5 hours on Sunday
* Murphy - ~5 hours on Saturday, ~5 hours on Sunday
* Raidon - Available to meet on Saturday but no coding, coding all day Sunday.

## How will we make decisions and how will we handle conflict?
When conflict arises, we are going to have a stand up to discuss the best way forward. As an entire group, when difficult decisions have to be made we will have as much discussion as needed for everyone to be informed. After this we will have a vote on brainstormed solutions. As a group we will stick with these solutions and respect the process. 

## How will we individually and as a team get the help we need? Technically?
In order: 
1. Google
2. Docs
3. Teammate
4. ChatGPT
5. Facilitators

## Conflict Resolution Plan
* Sean - When I get stressed or frustrated, I will bottle up and get into my shell. To get out of this I will take a break, step back, maybe chat and come back with a fresh mind
* Tristan - Same as above, and also toasties for stress reduction 
* Murphy - When I get stressed I can be agitated and hyperfixated. At this point I can usually identify that I need to take a break. When I need help from a teammate I'll always ask, and I will also need my team to help me get out of that mindspace.
* Raidon - When I am stressed my body will feel tight. I will take time to stretch and clear my mind away from any technology to ensure that I stay on top of this before it becomes a problem. Also physical exercise and talking to people help alleviate my stress. I'll grab people in my group to have a chat whenever I feel I need to and lucky for me they are happy to help

## How will we individually and as a team get the help we need? Non-technically?
We've all agreed to take time away from the project, and keep taking consistent breaks. If any major issues arise we can talk to each other, our personal support network, facilitators, and Rosie and Joseph.  

## How will we make sure everyone is included? 
We will divide tasks on a Kanban and make sure everyone is assigned a task (not necessarily a task they have to do alone). In stand-ups, everyone gets a chance to speak uninterrupted for an equal period of time. 

## How will you decide who needs to be present for which conversations? 
For conversations about the wider project (beyond the scope of a singular task), it is opt-out. These sorts of conversations will include the entire group, and if anyone feels as though their time would be better spent not in that meeting, they are free to do so. 

## How will we work? 
* Sean - Vibe Watcher
* Tristan - Git Keeper
* Raidon - Scrum Facilitator
* Murphy - Product Owner

We are going to be doing an agile sort of workflow. Morning stand up, midday stand up, end of day evaluation. Impromptu stand ups whenever anyone wants. We expect each sprint to be roughly 2 days. At the end of each sprint we will reassess and create a new MVP (after having achieved the previous one).

## How will we survive? 
We are going to have toastie time. Sean will bring a football in and we can muck around on the grass. Also during lunchtimes we can have times when we're not allowed to talk about the technical parts of the project at all. Also we will change the scenery and work in different places to keep it fresh ie. working in a cafe, library, at home. 


## Technical PLanning
### MVP 
Single page app, where you can choose from one of two categories to get a random prompt from within that category. Once this is chosen, the game will start. Each game consists of rounds. Each round is a single photo that has to be guessed. You can guess once in each stage within this round. In each stage, the photo becomes progressively less blurred. The goal is to guess each round's photo in as few stages as possible. These images in our MVP are pre-generated from an AI image generator. This API is free, and requests will be limited because we only use it to populate a database that we will then use to populate our game. This is our endpoint https://api.replicate.com/v1/predictions/.
We will use prompts such as "Panda", and save the body of the response into a local database, which is what we will use in the actual game. The response is a series of progressively less blurry inages. 

### Stretch
- Multiple gamemodes
  - Image continuously gets less blurry over a period of time, rather than in stages
  - Mulitplayer modes
  - Change stages/ rounds
  - More than one image result for each round
- Custom prompts
- Hints per game that reveal the first letter, or length of word (Get two hints per game, can use them whenever you want)
- Actually requesting the API and generating the image as you play the game
- Choose difficulty (longer prompts)
- Dark mode
- Shows game information at the end of a game - stats like you took 3 seconds on average to guess!, or you guessed 6 times on round 3, and only twice on round 5

### Wireframes
![image](https://github.com/roa-2023/guess-with-less/assets/142761066/b42eda7c-b297-46ad-9365-acb3569707ba)

### User Stories
- As a user, I want to be able to guess what a random photo is. I want to be able to clearly see how to play the game, and to be able to play it without any confusion. I want the page to be nice to look at. 

- As a user, I want to have a feeling of stress (like a countdown) so I feel time pressure to put in a guess. I want there to feel like there is stakes. 

- I want to dunk on my friends and show them how good I am at guessing images when theyre super blurry. I want to be able to choose what category of image I'll have to guess. 

- As a user I want to be able to choose from multiple gamemodes to get a different flavour on the classic Guess With Less experience. 

## Documentation
