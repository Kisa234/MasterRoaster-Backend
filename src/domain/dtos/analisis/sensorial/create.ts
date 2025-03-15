import { create } from 'domain';



export class CreateAnalisisSensorialDTO {

    private constructor(
        public readonly fragancia_aroma       :number,
        public readonly sabor                 :number,
        public readonly sabor_residual        :number,
        public readonly acidez                :number,
        public readonly cuerpo                :number,
        public readonly uniformidad           :number,
        public readonly balance               :number,
        public readonly taza_limpia           :number,
        public readonly dulzor                :number,
        public readonly puntaje_catador       :number,
        public readonly taza_defecto_ligero   :number,
        public readonly tazas_defecto_rechazo :number,
        public readonly puntaje_taza          :number,
        public readonly comentario            :number,
    ){}

    static create(props: { [key: string]: any }): [string?, CreateAnalisisSensorialDTO?] {
        const { 
            fragancia_aroma, sabor, sabor_residual, acidez, cuerpo,
            uniformidad, balance, taza_limpia, dulzor, puntaje_catador,
            taza_defecto_ligero, tazas_defecto_rechazo, puntaje_taza,
            comentario
        } = props;

        if (!fragancia_aroma) return ['La fragancia/aroma es requerida', undefined];
        if (!sabor) return ['El sabor es requerido', undefined];
        if (!sabor_residual) return ['El sabor residual es requerido', undefined];
        if (!acidez) return ['La acidez es requerida', undefined];
        if (!cuerpo) return ['El cuerpo es requerido', undefined];
        if (!uniformidad) return ['La uniformidad es requerida', undefined];
        if (!balance) return ['El balance es requerido', undefined];
        if (!taza_limpia) return ['La taza limpia es requerida', undefined];
        if (!dulzor) return ['El dulzor es requerido', undefined];
        if (!puntaje_catador) return ['El puntaje del catador es requerido', undefined];
        if (!taza_defecto_ligero) return ['El taza defecto ligero es requerido', undefined];
        if (!tazas_defecto_rechazo) return ['El taza defecto rechazo es requerido', undefined];
        if (!puntaje_taza) return ['El puntaje de la taza es requerido', undefined];
        if (!comentario) return ['El comentario es requerido', undefined];
   

        return [undefined, new CreateAnalisisSensorialDTO(
            fragancia_aroma, sabor, sabor_residual, acidez, cuerpo,
            uniformidad, balance, taza_limpia, dulzor, puntaje_catador,
            taza_defecto_ligero, tazas_defecto_rechazo, puntaje_taza,
            comentario
        )];

    }

}