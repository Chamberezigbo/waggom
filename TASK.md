---

## ✅ `TASKS.md` (Daily Direction)

```md
# Task Management

# Guiding Principles

## 1. Service Layer with Separation of Concerns
- All business logic must reside in **service classes/modules**, not in controllers or routes.  
- Controllers/routes should only handle HTTP **request/response** and delegate to services.  
- This ensures **maintainability**, **testability**, and clear **boundaries between layers**.

## 2. Swagger Comments as Source of Truth
- API documentation and contracts are defined using **Swagger comments directly in route files**.  
- All backend and frontend code must adhere to the **Swagger-defined endpoints**, request/response shapes, and error handling.  
- Any change to an endpoint must first be reflected in the **route’s Swagger comments** before implementation.

- Use Swagger comments to **auto-generate types, docs, and client/server stubs** where possible.  
- Treat **Swagger comments as the single source of truth** for API design, validation, and documentation.

### Think of Swagger Comments as:
- The **blueprint for your API**: if it’s not documented in Swagger comments, it doesn’t exist.  
- The **contract** between backend, frontend, and external consumers.  
- The foundation for **automated testing**, **code generation**, and **documentation**.

## 🔥 Immediate Focus
- [ ] work on getting student get event with pagination 

## 🚧 In Progress
- [ ] setup receiving email for contact us when a user fill the contact us email form (fullname,Email address and Message these are form input)
- [ ] send email notification for student accepted or rejected admission
- [ ] 

## 📌 Backlog
- [ ] 

## ✅ Completed

- [x] Create endpoint for auth
- [x] Create an error class for error middleware so i can pass it to next
- [x] create a news endpoint with Title Summary, Category and Message Body(delete edit view) admin
- [x]create an event endpoint with Title, Date, location and Description(delete edit and view) for admin
- [x] handle cors for this system 
- [x]create endpoint for admin to view testimony approve or delete filter by pending and approved 
- [x]create endpoint for users to share testimony name,contact email, testimony and photo without auth(save the photo in upload folder then url to db and handle the folder to be public  )
- [x] setup a build to init ang generate prisma for cPanel and mysql environment for build command 
- [x] create endpoint for admin to view approve reject delete admission request
- [x] create endpoint to allow users apply for admission(Programme Level
,Programme of Choice,Two (2) Recent Passport-Sized Photographs,Surname,Firstname,Title,Other Names,Date of Birth,Place of Birth,Gender,Present Residential Address,Email Address,Phone Number,Permanent Home Address (No P.O. Box),Postal Address,Nationality,Native Language,Is Place of Birth Different from Nationality?,Marital Status, Religion,Denomination,Name and Address of Parent/Guardian,Emergency Contact
 Name and Address,Phone Number, Next of Kin
Name and Address Phone Number Educational Qualifications
Please list all institutions attended, beginning with the most recent Institution Name, From dd/mm/yyyy To, Qualification / Certificate Obtained Professional Certificates (if any) Upload Certificates,Description (optional) Financial and Health Information How do you intend to finance your studies? *,Do you have any special needs or health condition? *, Please provide details of two referees (one academic and one clergy)Academic Referee Full Name *, Profession *, Institution / Organization *,Address *,Phone Number *, Email Address *,2. Clergy Referee Full Name *,Position * Church / Ministry *,Address *, Phone Number *, Email Address *, Declaration Applicant’s Signature * enter full name, Date *
)

- [x]public endpoint for get all approved testimony 
- [x ] public endpoint to get all event created by admin 
- [x]create student login wit just email (if admistion status is still pending or reected return message your admisstion is still pending if reected say so )
- [x] get news for auth student, news with category of student

```

