# Doctor Appointment Booking System Implementation Plan

We will build the frontend for the Doctor Appointment Booking System using Next.js 14 and Google Stitch for UI generation. The architecture relies on an existing Spring Boot backend.

## Proposed Setup

### 1. UI Generation (Stitch)
We will use the StitchMCP tools provided to programmatically create a project and generate the 10 screens specified. Once generated, we will review the outputs and extract the React/Tailwind components into our codebase.

### 2. Frontend Repository
We will initialize a Next.js 14 App Router project (e.g., `d:/New Projact/medicare/frontend` or similar workspace location, assuming existing code is under `d:/New Projact/medicare/backend`).
- Next.js 14, React 18
- Tailwind CSS with specific MediCare theme tokens
- `shadcn/ui` components
- `next-auth` for Google OAuth
- `axios` and `swr` for data fetching
- `razorpay` for payments integration

### 3. File Map Integration
Instead of manual copy/pasting from a browser, we will use the `StitchMCP` integration to generate the components and bring their code into the Next.js workspace structure. If Stitch outputs full pages, we will componentize them as necessary and route them correctly.

#### Key Routes
- `/` - Home / Doctor Search
- `/login` - Login with Google
- `/doctors/[id]` - Doctor Profile & Slots
- `/payment` - Razorpay Payment Selection
- `/confirm` - Booking Confirmation Success
- `/dashboard` - Patient Dashboard
- `/doctor/portal` - Doctor Dashboard
- `/admin` - Admin Dashboard
- `/admin/feedback` - Feedback Page

### 4. Authentication (NextAuth)
Set up `app/api/auth/[...nextauth]/route.ts` with Google OAuth, validating against the Spring Boot backend (`/api/v1/auth/google`) to exchange the Google token for a JWT.

### 5. Payments (Razorpay)
Integrate `window.Razorpay` into the checkout flow, creating orders through the backend `/api/v1/payments/create-order`.

## User Review Required
> [!IMPORTANT]
> Since we use the `StitchMCP` tool inside our agent context, we will be able to generate screens. The generation might take 1-3 minutes per screen.
> Are you perfectly fine with placing the generated Next.js application in `d:/New Projact/medicare-frontend` alongside your `backend`?

## Verification Plan
### Automated & Manual Verification
- We will build the Next.js application locally and run `npm run dev` to ensure it compiles without errors.
- We will use `read_browser_page` to verify the components render correctly with Tailwind.
