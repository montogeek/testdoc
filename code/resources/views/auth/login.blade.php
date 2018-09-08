@extends('layouts.app')

@section('content')
    <div class="container mx-auto font-sans">
        <div class="max-w-sm mx-auto">
            <div class="w-full">
                <form method="POST" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                      action="{{ route('login') }}">
                    @csrf
                    <h1 class="font-bold text-2xl mb-2 pb-4">{{ __('Login') }}</h1>
                    <div class="mb-6">
                        <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
                            {{ __('E-Mail Address') }}
                        </label>
                        <input class="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                               id="email" type="email" name="email" value="{{ old('email') }}" required autofocus />
                        @if ($errors->has('email'))
                            <span class="text-red text-xs italic" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>
                    <div class="mb-6">
                        <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border {{ $errors->has('email') ? 'border-red' : ''}} rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                               id="password" type="password" name="password" required />
                        @if ($errors->has('password'))
                            <span class="text-red text-xs italic" role="alert">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
                    </div>
                    <div class="mb-6">
                        <input class="mr-2 leading-tight" type="checkbox" name="remember"
                               id="remember" {{ old('remember') ? 'checked' : '' }}>

                        <label class="text-grey text-sm font-bold" for="remember">
                            {{ __('Remember Me') }}
                        </label>
                    </div>
                    <div class="flex items-center justify-between">
                        <button type="submit" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {{ __('Login') }}
                        </button>
                        <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="{{ route('password.request') }}">
                            {{ __('Forgot Your Password?') }}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
