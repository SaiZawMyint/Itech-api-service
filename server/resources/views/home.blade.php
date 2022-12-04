@extends('layouts.app')

@section('content')
     {{-- <nav class="navbar navbar-expand-lg bg-light d-flex justify-content-end">
        <form class="d-flex">
              <li class="nav-item dropdown d-flex">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>{{ Auth::user()->name }}</span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                      <a class="dropdown-item tw-flex tw-space-x-2" href="{{ route('logout') }}">
                        Logout
                      </a>
                    </li>
                </ul>
              </li>
        </form>
      </nav> --}}
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    {{ __('You are logged in!') }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection