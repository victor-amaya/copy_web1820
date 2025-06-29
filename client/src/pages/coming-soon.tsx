import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Clock } from "lucide-react";
import { Link, useParams } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ComingSoonProps {
  serviceType?: string;
}

export default function ComingSoon({
  serviceType: propServiceType,
}: ComingSoonProps) {
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const params = useParams();
  const serviceType =
    propServiceType || params.serviceType || "Bloqueo de tarjetas y cuentas";

  const volver = () => {
    window.history.back();
  };

  const submitFeedback = useMutation({
    mutationFn: async (data: { serviceType: string; comment: string }) => {
      return await apiRequest("/api/service-feedback", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "¡Comentario enviado!",
        description:
          "Gracias por tu feedback. Te notificaremos cuando esté disponible.",
      });
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["service-feedback"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.message ||
          "No se pudo enviar el comentario. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor ingresa un comentario antes de enviar.",
        variant: "destructive",
      });
      return;
    }
    submitFeedback.mutate({ serviceType, comment: comment.trim() });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-8"
      style={{ fontFamily: "Barlow, sans-serif" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/services">
            <Button
              onClick={volver}
              variant="ghost"
              className="mb-4 text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a servicios
            </Button>
          </Link>
        </div>

        {/* Main Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              Próximamente
            </CardTitle>
            <CardDescription
              className="text-lg text-gray-600"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              {serviceType}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p
                className="text-gray-600 mb-4"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                Estamos trabajando en esta funcionalidad para brindarte la mejor
                experiencia.
                {/*Mientras tanto, nos encantaría conocer tu opinión.*/}
              </p>
            </div>

            {/* Feedback Form */}
            {/*<form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  Comparte tus comentarios o sugerencias
                </label>
                <Textarea
                  id="comment"
                  placeholder="¿Qué te gustaría que incluyéramos en esta funcionalidad?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="resize-none"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                />
              </div>

              <Button
                type="submit"
                disabled={submitFeedback.isPending || !comment.trim()}
                className="w-full font-semibold py-3"
                style={{
                  backgroundColor: '#4b289e',
                  color: '#fbd72c',
                  fontFamily: 'Barlow, sans-serif',
                  border: 'none'
                }}
              >
                {submitFeedback.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar comentario
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-500" style={{ fontFamily: 'Barlow, sans-serif' }}>
              Tu feedback nos ayuda a mejorar nuestros servicios
            </div>*/}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
