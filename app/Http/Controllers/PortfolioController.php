<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class PortfolioController extends Controller
{
    public function index(): View
    {
        return view('portfolio.index', [
            'pageTitle' => 'Melvin C. Cornejo | Full Stack Web Developer',

            'fullName' => 'MELVIN CORALES CORNEJO',

            'professionalTitle' => 'BSIT Graduate | Aspiring Web Developer',

            'introduction' => 'I build practical web applications using PHP and MySQL, with a focus on clean interfaces, reliable functionality, and continuous improvement.',
        ]);
    }
}