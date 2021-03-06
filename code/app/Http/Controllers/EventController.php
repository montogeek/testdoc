<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Event;
use Carbon\Carbon;

class EventController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Auth::user()->events;

        return view('events.index', ['events' => $events]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

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

        $event = new Event;
        $event->name = $data['name'];
        $event->startDate = Carbon::parse($data['startDate'])->format('Y-m-d H:i:s');
        $event->endDate = Carbon::parse($data['endDate'])->format('Y-m-d H:i:s');
        $event->location = $data['location'];

        $newEvent = Auth::user()->events()->save($event);

        $event->categories()->sync([
            1 => [
                'category_id' => 1,
                'budget' => 500,
            ],
            2 => [
                'category_id' => 2,
                'budget' => 400,
            ],
            3 => [
                'category_id' => 3,
                'budget' => 150,
            ],
            4 => [
                'category_id' => 4,
                'budget' => 300,
            ]
        ], false);

        return $newEvent;

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

        $event = Event::find($id);
        $event->name = $data['name'];
        $event->startDate = Carbon::parse($data['startDate'])->format('Y-m-d H:i:s');
        $event->endDate = Carbon::parse($data['endDate'])->format('Y-m-d H:i:s');
        $event->location = $data['location'];

        $event->save();

        return $event;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
