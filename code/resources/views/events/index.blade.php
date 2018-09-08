@extends('layouts.app')

@section('content')
    <div class="container mx-auto">
        @foreach ($events as $event)
            <div class="max-w-2xl rounded overflow-hidden shadow-lg flex p-4">
                <div class="h-24 w-24 bg-red-lighter rounded flex flex-col items-center justify-center mr-4">
                    <p class="text-5xl text-red-dark font-thin">{{ $event->day }}</p>
                    <p class="text-xl text-red-dark font-thin">{{ $event->month_year }}</p>
                </div>
                <div class="flex flex-col justify-around">
                    <p class="text-xl text-grey-darkest font-bold">{{ $event->name }}</p>
                    <p>{{ $event->duration }} horas</p>
                    <p>{{ $event->location }}</p>
                </div>
            </div>
        @endforeach
    </div>
@endsection
