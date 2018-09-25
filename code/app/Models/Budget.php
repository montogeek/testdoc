<?php

namespace App\Models;

use App\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Budget extends Pivot
{

	protected $fillable=['event_id','category_id','budget','extras'];

	protected $casts=[
		'extras'=>'json'
	];

	protected $attributes=[
		'extras'=>'{}'
	];


	public function budgets(){
		return $this->hasMany(Budget::class);
	}
}
