<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Event;
use Illuminate\Http\Request;

class MenuController extends Controller
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $event = Event::find($data['event_id']);

        $item = new Item();
        $item->name = $data['name'];
        $item->cost = $data['cost'];
        $item->shareKid = $data['shareKid'];
        $item->shareAdult = $data['shareAdult'];
        $item->notes = $data['notes'];
        $item->category_id = $data['category_id'];

        $event->items()->save($item);

        return $item;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $item = Item::find($id);
        $item->name = $data['name'];
        $item->cost = $data['cost'];
        $item->shareKid = $data['shareKid'];
        $item->shareAdult = $data['shareAdult'];
        $item->notes = $data['notes'];

        $item->save();

        return $item;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        //
    }
}
