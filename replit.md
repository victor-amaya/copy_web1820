# Web 1820 Banking Security Platform

## Overview

Web 1820 is a banking security platform that allows users to instantly block their banking products (credit cards, debit cards, mobile apps, and digital wallets) in case of theft or fraud. The application provides a multi-step wizard interface for product selection, personal data collection, processing, and account creation, with a focus on user security and ease of use.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system using Barlow font
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with local component state
- **Data Fetching**: TanStack Query for API state management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: TSX for TypeScript execution in development

### Development Environment
- **Platform**: Replit-optimized with custom vite plugins
- **Hot Reload**: Vite HMR with middleware mode
- **Error Handling**: Runtime error overlay for development
- **Port Configuration**: Express server on port 5000 with Vite proxy

## Key Components

### User Interface Flow
1. **Landing Screen**: Introduction and call-to-action
2. **Product Selection Screen**: Bank and product type selection with checkboxes
3. **Personal Data Screen**: User information collection with validation
4. **Processing Screen**: Dynamic loading with progress indicators
5. **Success Screen**: Confirmation of blocked products
6. **Account Creation Screen**: Additional user data and password setup
7. **Account Confirmation Screen**: Final confirmation with service links
8. **Services Screen**: Additional services information

### Data Models
- **Users Table**: Stores user account information including personal data and preferences
- **Entidades Financieras Table**: Contains banking institutions with logos and status
- **Block Requests Table**: Comprehensive tracking of blocking requests with:
  - Selected products (JSON format)
  - Status workflow (pending → processing → completed/failed)
  - Priority levels (low, normal, high, urgent)
  - Request type (block/unblock)
  - Timestamps for creation, processing, and updates
- **Type Safety**: Drizzle Zod schemas ensure runtime validation

### UI Components
- Custom component library built on Shadcn/ui
- Consistent design system with primary color scheme (purple/yellow)
- Mobile-responsive design with Barlow font family
- Form validation with real-time feedback

## Data Flow

1. **User Journey**: Multi-step wizard collects user selections and data progressively
2. **State Management**: Local React state manages form data and navigation between screens
3. **Data Persistence**: Form data flows from frontend to backend storage interface
4. **Validation**: Client-side validation with TypeScript type safety and Zod schemas
5. **Processing Simulation**: Dynamic progress indicators provide user feedback during request processing

## External Dependencies

### Core Dependencies
- **UI Framework**: React, Radix UI primitives, Tailwind CSS
- **Backend**: Express.js, Drizzle ORM, Neon Database serverless driver
- **Development**: Vite, TypeScript, TSX runtime
- **Validation**: Zod for schema validation, React Hook Form for form management

### Asset Management
- Static assets stored in attached_assets directory
- Bank logos and promotional images integrated into components
- Vite handles asset optimization and bundling

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to dist/public directory
- **Backend**: ESBuild bundles server code to dist/index.js
- **Assets**: Static assets copied and optimized during build

### Environment Configuration
- Development: tsx server with Vite middleware for HMR
- Production: Node.js server serving built static files
- Database: Environment variable configuration for PostgreSQL connection

### Replit Integration
- Custom workflows for development and production
- Port configuration for external access
- Git ignore patterns for build artifacts and dependencies

## Changelog

- **June 25, 2025**: Initial project setup
- **June 25, 2025**: Migration completed - Added PostgreSQL database integration
- **June 25, 2025**: Created Entidad Financiera table with API endpoints
- **June 25, 2025**: Updated ProductSelectionScreen to use dynamic data from database
- **June 25, 2025**: Created complete users table with API endpoints for user registration and block requests
- **June 25, 2025**: Integrated user data storage with PersonalDataScreen and AccountCreationScreen flows
- **June 25, 2025**: Enhanced block requests table with comprehensive tracking fields (status, priority, reason, timestamps)
- **June 25, 2025**: Added complete CRUD API for block requests management with status updates

## User Preferences

Preferred communication style: Simple, everyday language.