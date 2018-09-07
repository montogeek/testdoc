@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                @foreach ($events as $event)
                    <p>{{ $event->name }}</p>
                    <p>{{ $event->date }}</p>
                    <p>{{ $event->duration }}</p>
                    <p>{{ $event->location }}</p>
                    <p>Creado por {{ $event->user->name }}</p>
                @endforeach
            </div>
        </div>
    </div>
@endsection
