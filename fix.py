import sys

html_content = """<!DOCTYPE html>
<html lang="pt-PT" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CLICK - Creators Agency</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <!-- Custom Cursor -->
    <div id="cursor"></div>
    <div id="cursor-follower"></div>

    <!-- Preloader -->
    <div id="preloader">
        <div class="loader"></div>
    </div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top" id="navbar">
        <div class="container">
            <a class="navbar-brand" href="#">CLICK<span>.</span></a>
            <button class="navbar-toggler navbar-dark border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item"><a class="nav-link active" href="#home">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#services">Serviços</a></li>
                    <li class="nav-item"><a class="nav-link" href="#artists">Artistas</a></li>
                    <li class="nav-item"><a class="nav-link" href="#gallery">Galeria</a></li>
                    <li class="nav-item"><a class="nav-link" href="#plans">Planos</a></li>
                    <li class="nav-item"><a class="nav-link" href="#portfolio">Portfólio</a></li>
                    <li class="nav-item"><a class="nav-link" href="#about">Sobre</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contacto</a></li>
                </ul>
                <a href="#contact" class="btn btn-custom">Começar Agora</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 reveal">
                    <div class="mb-3">
                        <span class="badge bg-primary-custom text-dark px-3 py-2 rounded-pill fw-bold">Creators Agency</span>
                    </div>
"""

with open('index.html', 'r', encoding='utf-8') as f:
    original = f.read()

split_point = '                    <h1 class="hero-title">Transformamos Criadores em <span class="text-primary-custom">Marcas Poderosas</span></h1>'
parts = original.split(split_point)

if len(parts) > 1:
    new_content = html_content + split_point + parts[1]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed successfully")
else:
    print("Split point not found")
