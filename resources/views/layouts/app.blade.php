<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>@yield('title', 'MCCORNEJO | Portfolio')</title>

    <meta name="description" content="Welcome to my personal portfolio. Explore my background, skills, achievements, and projects.">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml"
          href="{{ asset('assets/images/mcc-favicon.svg') }}">

    <!-- Devicon -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- Original MCC Stylesheet -->
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">

    @stack('styles')
</head>
<body>

    <!-- NAVIGATION -->
    <header class="navbar">
        <div class="container nav-container">

            <a href="#home" class="brand" aria-label="MCC Home">
                <span class="brand-logo">
                    <span class="brand-frame brand-frame-top"></span>
                    <span class="brand-frame brand-frame-bottom"></span>

                    <span class="brand-corner brand-corner-tl"></span>
                    <span class="brand-corner brand-corner-tr"></span>
                    <span class="brand-corner brand-corner-bl"></span>
                    <span class="brand-corner brand-corner-br"></span>

                    <span class="brand-core">
                        <span class="brand-letter">M</span>
                        <span class="brand-letter">C</span>
                        <span class="brand-letter">C</span>
                    </span>

                    <span class="brand-energy"></span>
                </span>
            </a>

            <button class="menu-toggle" id="menuToggle"
                    aria-label="Toggle navigation"
                    aria-expanded="false">
                ☰
            </button>

            <nav class="nav-links" id="navLinks">

                <a href="#home" class="active">Home</a>
                <a href="#about">About</a>
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>

                <a href="https://github.com/melvincornejo456-droid"
                   class="nav-social-link"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="GitHub">
                    <i class="devicon-github-original"></i>
                </a>

                <a href="https://www.linkedin.com/in/melvin-cornejo-3b38b0407/"
                   class="nav-social-link"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="LinkedIn">
                    <i class="devicon-linkedin-plain"></i>
                </a>

            </nav>
        </div>
    </header>

    <!-- PAGE CONTENT -->
    <main>
        @yield('content')
    </main>

    <!-- MOBILE BOTTOM NAVIGATION -->
    <nav class="mobile-bottom-nav" aria-label="Mobile navigation">

        <a href="#home" class="mobile-nav-item active">
            <span class="mobile-nav-icon">
                <i data-lucide="house"></i>
            </span>
            <span>Home</span>
        </a>

        <a href="#about" class="mobile-nav-item">
            <span class="mobile-nav-icon">
                <i data-lucide="user-round"></i>
            </span>
            <span>About</span>
        </a>

        <a href="#projects" class="mobile-nav-item">
            <span class="mobile-nav-icon">
                <i data-lucide="folder-code"></i>
            </span>
            <span>Projects</span>
        </a>

        <a href="#contact" class="mobile-nav-item">
            <span class="mobile-nav-icon">
                <i data-lucide="mail"></i>
            </span>
            <span>Contact</span>
        </a>

    </nav>

    <!-- FOOTER -->
    <footer class="footer">
        <div class="container">
            <p>&copy; {{ date('Y') }} MCCORNEJO. All Rights Reserved.</p>
            <p>Designed with passion and purpose.</p>
        </div>
    </footer>

    <!-- ORIGINAL JAVASCRIPT -->
    <script src="{{ asset('assets/js/script.js') }}"></script>

    <!-- INITIALIZE LUCIDE ICONS -->
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    </script>

    @stack('scripts')

</body>
</html>