<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\NamedAddress;
use Symfony\Component\Routing\Annotation\Route;


class WebsiteController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index()
    {
        return $this->render('base.html.twig');
    }

    /**
     * @Route("/contact", name="contact")
     */
    public function contact(Request $request, MailerInterface $mailer)
    {
        $data = json_decode($request->getContent(), true);
        $data['userEmail'] = $data['email'];

        $email = (new TemplatedEmail())
            ->from(new NamedAddress('dms@dmstrucks.com', 'DMS Trucks'))
            ->to(new NamedAddress('dms@dmstrucks.com', 'DMS Trucks'))
            ->replyTo(new NamedAddress($data['userEmail'], $data['name']))
            ->subject('Novo contacto website: ' . $data['subject'])
            ->htmlTemplate('emails/contact.html.twig')
            ->context($data)
        ;

        try {
            $mailer->send($email);
            $success = true;
        } catch (\Exception $e) {
            $success = false;
        }

        return new JsonResponse([
            'success' => $success
        ]);
    }

    /**
     * @Route("/dms", options={"i18n": false})
     */
    public function redirectOld()
    {
        return $this->redirectToRoute('index', [], 301);
    }
}