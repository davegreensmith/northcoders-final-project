## Project Planning 
​
​
### What is an MVP
​
An MVP is the minimum viable product. That means that it is the absolute smallest and simplest version of your project that you would be happy to present to hiring partners. Remember that your project does not have to be production-ready and be able to go to market tomorrow. It it essentially a proof of concept, a prototype that proves your app works and could be used in the real world if you were so inclined.
​
At this point there will certainly be a number of small, quality of life, features that would be added to a real app. These features do not add a great deal of value to your project but would be included in the full version.
​
The MVP should focus on the critical-paths of your application. i.e. identify what is the core concept of your app, and make it do that well! An app that does one thing well presents better than an app that does something simple, with lots of little features.
​
​
### User Stories
​
To help with identifying what the core concept of the app is, write some user stories.
​
You can use the example user stories from the sprints as a guide. They should take the form:
​
> As a < role > I want/should/would/can < feature >

​
Write out the user stories for the MVP, try to keep these short and focused. If you have to use the word 'and' in a feature description, it's probably two!
​
​
## Tech Stack
​
Now you have your user stories it's time to consider how you are going to make them happen. Thinking about each of your user stories, do you know how to implement it using your existing skills or will you have to introduce some new tech? Project phase is a time to stretch yourselves and learn some new tech, be it services, libraries or platforms.
​
What tech are you going to be using 
​
## RAT
​
Now you have a good outline, it's time to find out if the project is actually possible. Each project will have new tech, hardware it relies on, a language you've never written in or something new and exciting that you've never done before.
​
Each of your features comes with a degree of difficulty. The next step is to identify which of these presents the biggest barrier to completing your project:
​
- Host a back-end api with postgresql: done that before, low priority.
- Write a mobile app with instant messaging: never done mobile, never done instant messaging, high priority!
​
In this example there are two main barriers to completing this project: making a mobile app, and getting real time messages to other users.
The first thing you should do is spike out these two things, and make sure that they are at least doable.
​
These spikes are called riskiest assumption tests, or RATs!
​
You are spiking the features of the project that are vital to its success. The goal of these spikes it to make sure that you can achieve the pieces in isolation.
​
They do not have to be linked together in a single project. In our above example. If we can get a working mobile app that renders a hard coded hello world, as well as being able to submit a form with a message in a react app and have it appear on another users screen. Then we have a proof of concept that these features work and it is at least possible to get this done.
​
Once all the RAT's have been completed. It's time to get started for real!
​
## Now over to you ...
​
​
### Project brief
​
ChipIn is an app that aims to bring communities closer together by allowing users to volunteer their free time, and request help from others.
​
​
### User Stories
​
Add your user Stories below:
​
### MVP
- As a user I will be able to set up a secure account on the platform
- As a user I want to have my own profile page with a bio listing my skills and qualifications
- As a user I should have the ability to post errands
- As a user I can view all available errands on a map
- As a user I can view an info page for a single errand
- As a user I should be able to update the info on an errand I have posted
- As a user I will be able to delete an errand I have posted
- As a user I can mark an errand I posted as complete
- As a user I want to be able to respond to an errand by volunteering to help
- As a user I will be able to update my bio to change my skills and qualifications
- As a user I can have the flexibility to determine the distance I am willing to travel
- As a user I will be notified in the app when someone volunteers themselves for my errand

### Bouble
- As a user I can give awards to people who volunteered to help after the job is complete
- As a user I want to have a live chat between volunteers and errand posters
- As a user I will have access to a social feed for users who fall inside my communitiy radius
- As a user I will receive a push notification when there is a new errand posted in my area
- As a user I will receive a push notification when someone volunteers to help me with my errand
​
### RATS
- Mapping for avaliable errands
- React Native
- Firebase
