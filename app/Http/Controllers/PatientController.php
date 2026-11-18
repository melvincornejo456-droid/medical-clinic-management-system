<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PatientController extends Controller
{
    /**
     * Display all registered patients.
     */
    public function index()
    {
        return Inertia::render('Patients', [
            'patients' => Patient::latest()->get(),
        ]);
    }

    /**
     * Store a newly registered patient.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:Male,Female',
            'phone' => 'required|string|max:30',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated) {
            $patient = Patient::create([
                ...$validated,
                'patient_id' => 'TEMP-' . Str::uuid(),
            ]);

            $patient->update([
                'patient_id' => 'PT-' . str_pad(
                    $patient->id + 1000,
                    4,
                    '0',
                    STR_PAD_LEFT
                ),
            ]);
        });

        return redirect()
            ->route('patients.index')
            ->with('success', 'Patient registered successfully!');
    }
}