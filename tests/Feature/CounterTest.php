<?php

namespace Tests\Feature;

use App\Models\Counter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CounterTest extends TestCase
{
    use RefreshDatabase;

    public function test_counter_page_displays_correctly(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Welcome')
            ->has('count')
            ->where('count', 0)
        );
    }

    public function test_counter_can_be_incremented(): void
    {
        // Create initial counter
        $this->get('/');
        
        $response = $this->post('/counter');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Welcome')
            ->where('count', 1)
        );

        $this->assertDatabaseHas('counters', [
            'count' => 1
        ]);
    }

    public function test_counter_can_be_decremented(): void
    {
        // Create counter with initial value
        Counter::create(['count' => 5]);
        
        $response = $this->patch('/counter');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Welcome')
            ->where('count', 4)
        );

        $this->assertDatabaseHas('counters', [
            'count' => 4
        ]);
    }

    public function test_counter_value_persists_across_requests(): void
    {
        // Increment counter multiple times
        $this->post('/counter');
        $this->post('/counter');
        $this->post('/counter');

        // Check that the value persists on a new page load
        $response = $this->get('/');

        $response->assertInertia(fn (Assert $page) => $page
            ->where('count', 3)
        );
    }

    public function test_counter_can_go_negative(): void
    {
        // Start with counter at 0
        $this->get('/');
        
        // Decrement to go negative
        $response = $this->patch('/counter');

        $response->assertInertia(fn (Assert $page) => $page
            ->where('count', -1)
        );
    }
}