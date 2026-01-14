# Contributing to Fullstack Starter

First off, thank you for considering contributing to Fullstack Starter! 🎉

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How Can I Contribute?](#how-can-i-contribute)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

**Be respectful, be collaborative, and be helpful.**

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9.x
- Docker and Docker Compose
- Git

### Development Setup

1. **Fork the repository**
   
   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/fullstack-starter.git
   cd fullstack-starter
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/fullstack-starter.git
   ```

4. **Install dependencies**

   ```bash
   pnpm install
   ```

5. **Set up environment variables**

   ```bash
   # API
   cp apps/api/.env.example apps/api/.env
   
   # Client (if needed)
   cp apps/client/.env.example apps/client/.env.local
   ```

6. **Start the database**

   ```bash
   pnpm db:up
   ```

7. **Run migrations**

   ```bash
   pnpm --filter api run prisma:migrate
   pnpm --filter api run prisma:seed
   ```

8. **Start development servers**

   ```bash
   pnpm dev
   ```

## 💡 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Include your environment details** (OS, Node version, pnpm version)

**Bug Report Template:**

```markdown
**Description**
A clear description of the bug.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS 14.0]
- Node: [e.g., 20.10.0]
- pnpm: [e.g., 9.15.4]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how it would be used**

### Pull Requests

1. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**

   - Follow the [Style Guidelines](#style-guidelines)
   - Write or update tests if applicable
   - Update documentation if needed

3. **Test your changes**

   ```bash
   # Run linter
   pnpm lint
   
   # Run tests
   pnpm test
   
   # Build to ensure no errors
   pnpm build
   ```

4. **Commit your changes**

   Follow the [Commit Message Guidelines](#commit-message-guidelines)

5. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**

   Go to the original repository and create a pull request from your fork.

## 🎨 Style Guidelines

### TypeScript Style Guide

- Use **TypeScript** for all new code
- Follow the existing code style (enforced by ESLint and Prettier)
- Use **meaningful variable and function names**
- Add **JSDoc comments** for complex functions
- Prefer **functional programming** patterns where appropriate

### File Naming

- Use **kebab-case** for files: `user-service.ts`
- Use **PascalCase** for React components: `UserProfile.tsx`
- Use **camelCase** for functions and variables: `getUserById`
- Use **UPPER_SNAKE_CASE** for constants: `MAX_RETRY_COUNT`

### Code Organization

```typescript
// 1. External imports
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

// 2. Internal imports
import { CreateUserDto } from './dto/create-user.dto';

// 3. Types/Interfaces
interface UserOptions {
  includeDeleted?: boolean;
}

// 4. Constants
const DEFAULT_PAGE_SIZE = 20;

// 5. Implementation
@Injectable()
export class UserService {
  // ...
}
```

### React/Next.js Guidelines

- Use **React Server Components** by default
- Add `'use client'` only when necessary
- Prefer **function components** over class components
- Use **TypeScript interfaces** for props
- Keep components **small and focused**

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process or auxiliary tools
- **perf**: Performance improvements
- **ci**: CI configuration changes
- **build**: Changes that affect the build system

### Examples

```bash
# Feature
feat(api): add user authentication endpoint

# Bug fix
fix(client): resolve button click handler issue

# Documentation
docs(readme): update installation instructions

# Chore
chore(deps): update dependencies to latest versions
```

### Scope Examples

- `api` - Backend changes
- `client` - Frontend changes
- `data` - Shared data package
- `core` - Core package
- `config` - Configuration package
- `docs` - Documentation
- `ci` - CI/CD changes

## 🔄 Pull Request Process

1. **Update Documentation**
   - Update the README.md if needed
   - Add/update JSDoc comments
   - Update Architecture docs if making structural changes

2. **Run All Checks**

   ```bash
   pnpm lint        # Linting
   pnpm test        # Tests
   pnpm build       # Build check
   ```

3. **Fill PR Template**

   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Unit tests pass
   - [ ] Manual testing completed
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings generated
   ```

4. **Wait for Review**
   - Be responsive to feedback
   - Make requested changes
   - Keep the PR scope focused

5. **Merge**
   - PRs require at least one approval
   - All CI checks must pass
   - Maintainers will merge approved PRs

## 🧪 Testing Guidelines

### Writing Tests

```typescript
// Unit test example
describe('UserService', () => {
  it('should create a user', async () => {
    const userData = { email: 'test@example.com' };
    const result = await userService.create(userData);
    expect(result.email).toBe(userData.email);
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter api test

# Run tests in watch mode
pnpm --filter api test:watch
```

## 📚 Additional Resources

- [Architecture Documentation](./docs/ARCHITECTURE.md)
- [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)

## ❓ Questions?

Feel free to:
- Open a [Discussion](https://github.com/ORIGINAL_OWNER/fullstack-starter/discussions)
- Ask in issues with the `question` label
- Reach out to maintainers

## 🙏 Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute! 🚀

---

**Happy Coding!** 💻✨
