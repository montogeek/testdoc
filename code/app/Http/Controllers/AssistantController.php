<?php

namespace App\Http\Controllers;

use App\Assistant;
use Illuminate\Http\Request;

class AssistantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * <<<<<<< HEAD:code/app/Http/Controllers/BudgetController.php
     * @param  \App\Models\Budget $budget
     * =======
     * @param  int $id
     * >>>>>>> 5668c8ba13c5aacd3dc1b7d10464ace194e40351:code/app/Http/Controllers/AssistantController.php
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * <<<<<<< HEAD:code/app/Http/Controllers/BudgetController.php
     * @param  \App\Models\Budget $budget
     * =======
     * @param  int $id
     * >>>>>>> 5668c8ba13c5aacd3dc1b7d10464ace194e40351:code/app/Http/Controllers/AssistantController.php
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $assistant = Assistant::find($id);
        $assistant->name = $data['name'];
        $assistant->address = $data['address'];
        $assistant->phonenumber = $data['phonenumber'];
        $assistant->rsvp = $data['rsvp'];
        $assistant->email = $data['email'];
        $assistant->kids = $data['kids'];
        $assistant->adults = $data['adults'];

        $assistant->save();

        return $assistant;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $assistant = Assistant::find($id);

        $assistant->delete();

        return response()->json([], 200);
    }
}
