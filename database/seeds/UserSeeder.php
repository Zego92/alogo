<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Admin',
            'Surname' => 'Admin',
            'role' => 'admin',
            'phone' => '+380970238693',
            'email' => 'admin@test.com',
            'password' => Hash::make('123456')
        ]);
    }
}
