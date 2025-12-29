# Car-Manager

**[Watch the code walkthrough video](https://cdnapisec.kaltura.com/p/391241/embedPlaykitJs/uiconf_id/44855082?iframeembed=true&entry_id=1_plsryv7h&config%5Bprovider%5D=%7B%22widgetId%22%3A%221_mm4h9lnf%22%7D&config%5Bplayback%5D=%7B%22startTime%22%3A0%7D)


## Project Context

This project was developed as part of a university software engineering course focused on **microservice-based architecture**. The objective was to design and implement a **piece of software of value** by decomposing functionality into independent services that communicate over well-defined interfaces.

I chose to build **Car Manager**, a system that helps users track vehicles, maintenance items, and related data, because it mirrors a real-world CRUD + service-integration problem.

## Architecture Overview

The application is composed of multiple microservices, each responsible for a single domain concern:

- **Car Manager (Main Service)**  
  Acts as the central orchestrator, handling user interactions and coordinating requests between downstream microservices.

- **Item Storage Microservice**  
  Manages persistent storage and retrieval of vehicle-related items via a MongoDB database.

- **Issue Tracker Microservice**  
  Tracks issues submitted by user.

- **Image Microservice**  
  Handles image-related functionality, such as storing or retrieving images associated with vehicles.

- **Quote Generator Microservice**  
  Provides dynamically generated quotes.

- **Calculator Microservice**  
  Performs isolated calculation logic, illustrating how compute-focused responsibilities can be separated into independent services.

Each microservice is **independently deployable, testable, and loosely coupled**, reflecting real-world distributed system design patterns.

Each service can be developed, tested, and scaled independently, reflecting real-world distributed system patterns.

## Technologies Used

- Python
- Flask (REST APIs)
- HTTP/JSON for inter-service communication
- Local persistence (file-based / database-backed storage)
- MongoDB database
- Git & GitHub for version control

## Learning Outcomes

Through this project, I gained hands-on experience with:

- Designing service boundaries and APIs
- Implementing synchronous service-to-service communication
- Managing state across independent services
- Structuring a codebase for scalability and maintainability
- Debugging integration issues in distributed systems


## Collaboration & Attribution

This project was completed as part of a team-based assignment.

- The **Calculator Microservice** was implemented by a teammate as part of the overall system.
- All other services, system integration, and architectural design were implemented by me.



