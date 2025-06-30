# Authentication System

This project implements a simple authentication system with the following features:

## Features

- **Login by Default**: The app shows the login page by default when not authenticated
- **Zod Validation**: Form validation using Zod schema
- **Protected Routes**: Dashboard is only accessible after successful authentication
- **Gluestack UI Components**: Uses Gluestack UI components for consistent styling
- **React Hook Form**: Form handling with react-hook-form

## Demo Credentials

- **Username**: `krishnamodi`
- **Password**: `Admin@123`

## Implementation Details

### Authentication Context (`hooks/useAuth.tsx`)
- Manages authentication state
- Provides `login()` and `logout()` functions
- Uses React Context for state management

### Login Form (`screens/auth/login/index.tsx`)
- Form validation with Zod schema
- Uses react-hook-form for form handling
- Shows validation errors
- Displays demo credentials for testing

### Protected Dashboard (`app/(tabs)/index.tsx`)
- Only accessible after successful login
- Shows welcome message with credentials
- Includes logout functionality

### Route Protection (`app/_layout.tsx`)
- Conditionally renders login or dashboard based on auth state
- Wraps app with AuthProvider

## UI Components Created

- **Input**: Text input component with variants
- **VStack**: Vertical stacking component with spacing
- **HStack**: Horizontal stacking component with spacing

## Usage

1. Start the app - login page will be shown by default
2. Enter the demo credentials: `krishnamodi` / `Admin@123`
3. After successful login, you'll be redirected to the dashboard
4. Use the logout button to return to the login page

## Dependencies

- `@gluestack-ui/input` - Input component
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Zod integration
- `zod` - Schema validation
- `expo-router` - Navigation 