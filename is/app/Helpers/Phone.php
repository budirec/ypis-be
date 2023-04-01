<?php

namespace App\Helpers;

class Phone
{
    public static function formatPhoneNumber($number): string|null
    {
        $number = preg_replace('/[^0-9]/', '', $number);
        $length = strlen($number);
        if ($length === 10) {
            return preg_replace('/([0-9]{3})([0-9]{3})([0-9]{4})/', '($1) $2-$3', $number);
        } elseif ($length === 11) {
            return preg_replace('/([0-9]{1})([0-9]{3})([0-9]{3})([0-9]{4})/', '+$1 ($2) $3-$4', $number);
        }

        return $number;
    }
}
