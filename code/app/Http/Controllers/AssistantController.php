<?php

namespace App\Http\Controllers;

use App\Assistant;
use App\Event;
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
        $data = $request->all();
        $event = Event::find($data['event_id']);

        $assistant = new Assistant();
        $assistant->name = $data['name'];
        $assistant->address = $data['address'];
        $assistant->city = $data['city'];
        $assistant->state = $data['state'];
        $assistant->zip = $data['zip'];
        $assistant->phonenumber = $data['phonenumber'];
        $assistant->email = $data['email'];
        $assistant->rsvp = $data['rsvp'];
        $assistant->kids = $data['kids'];
        $assistant->adults = $data['adults'];

        $event->assistant()->save($assistant);

        return $assistant;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
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
