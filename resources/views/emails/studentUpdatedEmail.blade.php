<x-mail::message>
Hello {{ $name }}!

One of our administrators updated your details in the system.

What have changed: <br>

@if ($updatedName)
  Your name -> ({{ $updatedName }}) <br>
@endif

@if ($updatedEmail)
  Your email -> ({{ $updatedEmail }}) <br>
@endif

@if ($updatedPhoto)
  Your photo <br>
@endif

@if ($updatedGroups)
  Your groups -> ({{ $updatedGroups }}) <br>
@endif

We wish you a good study!

Thanks,<br>
{{ config('app.name') }} administration
</x-mail::message>
