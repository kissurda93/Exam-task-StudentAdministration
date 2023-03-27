<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudyGroupController;
use Database\Factories\StudentFactory;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/students', [StudentController::class, 'getStudents']);
Route::post('/newStudent', [StudentController::class, 'newStudent']);
Route::patch('/updateStudent', [StudentController::class, 'updateStudent']);
Route::delete('/deleteStudent', [StudentController::class, 'deleteStudent']);

Route::get('/studyGroups', [StudyGroupController::class, 'getStudyGroups']);
