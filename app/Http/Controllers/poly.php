<?php

namespace App\Http\Controllers;
interface Human
{
    public function getName();
    public function setName(string $name);
}

abstract class Military
{
    private $rank;
    private $post = [];

    public function __construct($rank)
    {
        $this->rank = $rank;
    }
    public function setRank($rank)
    {
        $this->rank = $rank;
    }
    public function getRank()
    {
        return $this->rank;
    }
}

class Soldier extends Military implements Human
{
    public $name;

    public function __construct(string $name, string $rank)
    {
        $this->name = $name;
        parent::__construct($rank); # parent::setName($rank);
    }
    public function setName(string $name)
    {
        $this->name = $name;
    }
    public function getName()
    {
        return "My name is: " . $this->name . "<br />";
    }
    public function getRank()
    {
        return "My rank is: " . parent::getRank() . "<br />";
        ;
    }
    public function getFull()
    {
        return "I am " . parent::getRank() . " {$this->name}<br />";
    }
}
class poly extends Soldier
{
     public function setName(string $name)
    {
        $this->name = $name;
    }
 public function __Constructor()
    {

$goodSoldier = new Soldier('Thomas', 'Officer');

echo $goodSoldier->getName();
echo $goodSoldier->getRank();
echo $goodSoldier->getFull();
echo "<br />";
$goodSoldier->setRank('Colonel');
$goodSoldier->setName('Mustard');
echo $goodSoldier->getName();
echo $goodSoldier->getRank();
echo $goodSoldier->getFull();
}
}
