@extends('layouts.app')

@section('title', $pageTitle)

@section('content')

    <!-- HOME SECTION -->
    <section class="hero" id="home">
        <div class="container hero-content">

            <div class="hero-text">

                <p class="eyebrow">
                    <span class="hero-status-dot"></span>
                    ASPIRING WEB DEVELOPER
                </p>

                <p class="hero-greeting">Hello, I'm</p>

                <h1>{{ $fullName }}</h1>

                <h2 class="hero-professional-title">
                    <span
                        id="typingTitle"
                        data-roles='["BSIT - GRADUATE | EVSU - TC","PHP & MySQL Developer","Web Application Developer","Continuous Learner & Developer"]'
                    >{{ $professionalTitle }}</span><span class="typing-cursor" aria-hidden="true">|</span>
                </h2>

                <p class="hero-description">
                    {{ $introduction }}
                </p>

                <div class="hero-tech-stack"></div>

                <div class="hero-buttons">

                    <a href="#projects" class="btn btn-primary">
                        Explore My Projects →
                    </a>

                    <a href="#contact" class="btn btn-outline">
                        Get In Touch
                    </a>

                    <a
                        href="https://github.com/melvincornejo456-droid"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-github"
                    >
                        GitHub Profile ↗
                    </a>

                </div>

                <p class="hero-note">
                    <span class="hero-note-symbol">✦</span>
                    Driven by curiosity. Focused on growth. Committed to building.
                </p>

            </div>

            <div class="hero-image developer-visual">

                <div class="code-window">

                    <div class="code-window-header">
                        <div class="window-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <span class="code-filename">about-me.php</span>
                    </div>

                    <div class="code-window-body">

                        <div class="code-profile">
                            <img
                                src="{{ asset('assets/images/profile.jpg') }}"
                                alt="Portrait of Melvin Corales Cornejo"
                                class="profile-photo"
                            >
                        </div>

                        <div class="code-content">
                            <p><span class="code-purple">const</span> developer = {</p>
                            <p>&nbsp;&nbsp;name: <span class="code-green">"Melvin C. Cornejo"</span>,</p>
                            <p>&nbsp;&nbsp;role: <span class="code-green">"Web Developer"</span>,</p>
                            <p>&nbsp;&nbsp;stack: [<span class="code-orange">"PHP"</span>, <span class="code-orange">"MySQL ..."</span>],</p>
                            <p>&nbsp;&nbsp;passion: <span class="code-green">"Building solutions"</span>,</p>
                            <p>&nbsp;&nbsp;learning: <span class="code-blue">true</span></p>
                            <p>};<span class="code-cursor"></span></p>
                        </div>

                    </div>

                    <div class="code-window-footer">
                        <span><i></i> Available for opportunities</span>
                        <span>mccornejo.dev</span>
                    </div>

                </div>

                <div class="floating-code floating-code-left">&lt;/&gt;</div>
                <div class="floating-code floating-code-right">{ }</div>
                <div class="floating-code floating-code-bottom">git push</div>

            </div>

        </div>

        <div class="scroll-indicator">
            <span>SCROLL TO EXPLORE</span>
            <div class="scroll-line"></div>
        </div>

    </section>

@endsection